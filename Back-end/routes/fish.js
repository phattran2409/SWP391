const router = require("express").Router();
const fishkois = require("../models/fishkoi");
const middleware = require("../controller/middlewareController");

router.get('/getAll' ,middleware.verifyTokenAdminAuth, async (req ,res) => { 
    try {
        const fishkoi = await fishkois.find({});
        const count = await fishkois.find({}.count())
        res.status(200).json({count : count ,  fishkoi})
    } catch (err) {
        return res.status(500).json(err)
    }
})
// laya ra nhung con ca koi cung ban menh 
router.get('/getKoiElement'  , async(req ,res) => {
    try {
        const data = req.body;
        console.log(req.elementID);
        console.log("query "+req.query.elementID);
        //get bang body
        // const fishkoi = await fishkois.find({elementID : parseInt(data.elementID) });

        //get bang query
        const fishkoi = await fishkois.find({
        elementID : parseInt(req.query.elementID)
        });
        console.log(typeof  fishkoi)
        console.log(fishkoi.length);
        
          if (fishkoi.length === 0) {
            return res.status(403).json("data is not found")
        }
     return    res.status(200).json({fishkois : fishkoi});
        
    }catch (err ) {
       return  res.status(500).json({message  : err})
    }
})
module.exports = router