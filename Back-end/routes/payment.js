var express = require("express");
var router = express.Router();
const orders = require("../models/orders");
const  packageMember  = require("../models/packageMember");
const users = require("../models/user");
const axios = require("axios");
const moment = require("moment"); 
// const qs = require("qs");
const CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");



   const config = {
     app_id: "2553",
     key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
     key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
     endpoint: "https://sb-openapi.zalopay.vn/v2/create",
   };


router.post("/paymentMomo", async (req, res) => {
   const { _id, amount_1 } = req.body;

  
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime(); ;
  var orderId =  requestId;   
  var orderInfo = "pay with MoMo";
  var redirectUrl = "http://fengshuikoi.vercel.app/memberPackage/thankyou";
   var ipnUrl = "https://saved-saved-honeybee.ngrok-free.app/v1/pay/callback";

  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = amount_1;
  var requestType = "payWithMethod";
  var extraData = _id ; //pass empty value if your merchant does not have stores



  console.log("ExtraData : " +extraData);


  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
 
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "test",
    storeId: "MomotestStore",
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId, 
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects


 try  {
     const result = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", // URL to MoMo API
       requestBody, // Request body
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
    
     res.status(200).json(result.data);
    } catch(err) {
        res.status(500).json(err)
    }
  
 
});
router.post("/callback", async (req ,res) => {
    
    try {
      const {
        orderId,
        requestId,
        amount,
        orderInfo,
        transId,
        resultCode,
        message,
        responseTime,
        extraData,
      } = req.body;
     console.log(extraData );
    console.log("type Of amount "+typeof amount);
    console.log(amount);
    
    if (resultCode === 0) { 
      const package = await packageMember.findOne({accountID : extraData})
      const newOrder = new orders({
        accountID : extraData,
        packageType : package.name,
        orderId : orderId ,  
        amount : amount,
        message :  message,
        resultCode : parseInt(resultCode) , 
        status : true,
      }); 
      await newOrder.save();
      const newnotification = {
        content : "register member successful",
        status : true
      }
      const userUpdateMemberStatus = await users.findByIdAndUpdate(
        extraData,
         {memberStatus : true, 
          $push : {notification : newnotification}
         },
        { new: true, runValidators: true }
      ); 

      console.log(userUpdateMemberStatus);
      
     
      
    return  res.status(200).json({user : userUpdateMemberStatus , message : "register member Succesful"})
    } 
     const result = await packageMember.deleteOne({accountID : extraData});
    
      if (result.deletedCount === 1) {
        console.log("Document successfully deleted");
      } else {
        console.log("No document found with that accountID");
      }
      
     return res.status(403).json({message : message , result : "clear package "});

    } catch (err) {
        return res.status(500).json(err)
    }
    
})

router.post("/paymentZalo" , async (req ,res) => { 

    const {
      _id,
      packageType, 
      amount_1
    } = req.body
    const embed_data = {
      //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
      redirecturl: "http://fengshuikoi.vercel.app/memberPackage/thankyou",
    };

   const items = [{_id , packageType }];
   const transID = Math.floor(Math.random() * 1000000);
   const order = {
     app_id: config.app_id,
     app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
     app_user: "user123",
     app_time: Date.now(), // miliseconds
     item: JSON.stringify(items),
     embed_data: JSON.stringify(embed_data),
     amount: amount_1,
     description: `FengShuiKoi - Payment for the Member  #${transID}`,
     bank_code: "",
     callback_url:
       "https://saved-saved-honeybee.ngrok-free.app/v1/pay/callbackZalo",
   };
   
  //  callback_url:"https://1c7c-171-240-246-45.ngrok-free.app/v1/pay/callbackZalo",
   // appid|app_trans_id|appuser|amount|apptime|embeddata|item
   const data =
     config.app_id +
     "|" +
     order.app_trans_id +
     "|" +
     order.app_user +
     "|" +
     order.amount +
     "|" +
     order.app_time +
     "|" +
     order.embed_data +
     "|" +
     order.item;
   order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
   try {
    const  result = await  axios.post(config.endpoint , null , {params : order});
    return res.status(200).json(result.data);
   } catch (error) {
    console.log(error);
   }
}) 

router.post("/callbackZalo", async (req, res) => {
  let result = {};
  console.log(req.body);
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;
    let  data = JSON.parse(dataStr);
    let item = JSON.parse(data.item);
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);
    console.log("data Callback" + JSON.parse(dataStr));
  

    


    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";

      const handleError = packageMember.deleteOne({accountID :  item[0]._id})
      console.log(handleError);
      
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng ở đây
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      

      const newOrder = new orders({
        accountID: item[0]._id,
        packageType: item[0].packageType,
        orderId: data.zp_trans_id,
        amount: data.amount,
        message: "Success",
        resultCode:  0,
        status: true,
      }); 
      console.log("Orders"+ newOrder);
      
      await newOrder.save();
      const newnotification = {
        content : "register member successful",
        status : true
      }

      const userUpdateMemberStatus = await users.findByIdAndUpdate(
        item[0]._id,
         {memberStatus : true, 
          $push : {notification : newnotification}
         },
        { new: true, runValidators: true }
      ); 

      

      // // 
       result.return_code = 1;
       result.return_message = "success";

    return  res.status(200).json({user : userUpdateMemberStatus , message : "register member Succesful"})
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

module.exports = router