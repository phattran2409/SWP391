const router = require("express").Router();
const pondController = require("../controller/pondController");
const middlewareController = require("../controller/middlewareController");

//Get all pond

router.get('/getAllPond', middlewareController.verifyTokenAdminAuth , pondController.getAllPond);

//Get pond by element
router.get('/getByElement', middlewareController.verifyTokenAdminAuth, pondController.getByElement);

//Get pond by id
router.get('/getById/:id', middlewareController.verifyTokenAdminAuth, pondController.getById);

//Create new pond
router.post('/createPond', middlewareController.verifyTokenAdminAuth ,pondController.createPond);


//Update pond 
router.put('/updatePond/:id',middlewareController.verifyTokenAdminAuth, pondController.updatePond);


//Delete pond
router.delete('/deletePond/:id', middlewareController.verifyTokenAdminAuth ,  pondController.deletePond);

//Search pond
router.get('/searchPond', middlewareController.verifyTokenAdminAuth, pondController.searchPond);


module.exports = router;
