const router = require("express").Router();
const middleware = require("../controller/middlewareController");
const userController = require("../controller/userController");

router.post("/postADS",  middleware.verifyTokenMember , (req ,res) => { 
    res.status(200).json("dang bai thanhg cong doi duyet di ");

});

module.exports = router;
