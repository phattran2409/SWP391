const router = require("express").Router();
const fishkois = require("../models/fishkoi");
const middleware = require("../controller/middlewareController");
const  fishController = require("../controller/fishController");
const middlewareController = require("../controller/middlewareController");

//
router.get('/' ,fishController.getAll);
//  v1/fish/createKoi
router.post('/createKoi',fishController.create);
// v1/fish/deleteKoi
router.delete('/deleteKoi/:id' ,middleware.verifyTokenAdminAuth, fishController.delete);
//v1/fish/updateKoi/:id
router.put('/updateKoi/:id' ,middleware.verifyTokenAdminAuth ,fishController.update);
// v1/fish/search/
router.get('/search',fishController.search);
// laya ra nhung co ca koi cung ban menh 
// v1/fish/getKoiElement
router.get('/getKoiElement/:id' , fishController.getKoiByElementId);

//Get koi by id
router.get('/getKoiById/:id', fishController.getKoiById);


module.exports = router




