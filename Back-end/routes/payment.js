var express = require("express");
var router = express.Router();
const orders = require("../models/orders");
const  packageMember  = require("../models/packageMember");
const users = require("../models/user");
const axios = require("axios");

router.post("/paymentMomo", async (req, res) => {
   const { _id , amount_1} = req.body;

  
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime(); ;
  var orderId =  requestId;   
  var orderInfo = "pay with MoMo";
  var redirectUrl = "http://localhost:5173/memberPackage/thankyou";

  var ipnUrl = "https://swp391-feng-shui.onrender.com/v1/pay/callback";

  // var ipnUrl ="https://d83b-2402-800-6319-e70-cf1-c465-e7f3-3c59.ngrok-free.app/v1/pay/callback";
  // var ipnUrl ="https://swp391-jruy.onrender.com/v1/pay/callback";

  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = amount_1;
  var requestType = "payWithMethod";
  var extraData = _id; //pass empty value if your merchant does not have stores

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
     console.log(extraData ,);
    console.log("type Of amount "+typeof amount);
    console.log(amount);
    
    if (resultCode === 0) { 
      const newOrder = new orders({
        accountID : extraData,
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


module.exports = router