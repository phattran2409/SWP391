
const router = require("express").Router();
const pondController = require("../controller/pondController");
const middlewareController = require("../controller/middlewareController");

//Get all pond

router.get('/getAllPond', pondController.getAllPond);

//Get pond by element 
// v1/pond/getByElement/1
router.get('/getByElement/:id', pondController.getByElement);

//Get pond by id
router.get("/getById/:id", pondController.getById);

//Create new pond
router.post('/createPond' ,middlewareController.verifyTokenAdminAuth,pondController.createPond);


//Update pond 
router.put('/updatePond/:id', middlewareController.verifyTokenAdminAuth, pondController.updatePond);


//Delete pond
router.delete('/deletePond/:id', middlewareController.verifyTokenAdminAuth,  pondController.deletePond);

//Search pond
router.get('/searchPond',  pondController.searchPond);


module.exports = router;
