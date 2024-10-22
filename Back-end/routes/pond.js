const router = require("express").Router();
const pondController = require("../controller/pondController");
const middlewareController = require("../controller/middlewareController");

//Get all pond

router.get('/getAllPond',  pondController.getAllPond);

//Get pond by element
router.get('/getByElement/:id',  pondController.getByElement);

//Get pond by id
router.get('/getById/:id', pondController.getById);

//Create new pond
router.post('/createPond', pondController.createPond);


//Update pond 
router.put('/updatePond/:id', pondController.updatePond);


//Delete pond
router.delete('/deletePond/:id',  pondController.deletePond);

//Search pond
router.get('/searchPond',  pondController.searchPond);


module.exports = router;
