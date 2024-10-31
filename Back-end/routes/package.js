const router = require("express").Router();
const middlewareController = require("../controller/middlewareController");
const packageController = require("../controller/PackageController"); 


router.get("/", packageController.GetAllPackage);


router.post(
  "/create",
  middlewareController.verifyTokenAdminAuth,
  packageController.createPackage
);

router.post(
  "/update",
  middlewareController.verifyTokenAdminAuth,
  packageController.UpdatePackage
);

router.post(
  "/delete",
  middlewareController.verifyTokenAdminAuth,
  packageController.DeletePackage
);

router.post("/getById", packageController.getByIdPackage);
// router.post("/")



module.exports = router;