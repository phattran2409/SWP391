const router = require("express").Router();
const postController = require("../controller/postController");
const middlewareController = require("../controller/middlewareController");
const orderController = require("../controller/orderController");

// v1/order
router.get(
  "/",
  middlewareController.verifyTokenAdminAuth,
  orderController.getAllOrder
);
// v1/order/delete
router.delete("/delete:id", middlewareController.verifyTokenAdminAuth,  orderController.deleteOrder);
router.get("/getProfile", orderController.viewProfileUser);
router.get("/orderCount", orderController.getMonthlyOrderCount);
router.get("/getByUser/:id", orderController.getOrderByUser);
router.get("/getById/:id", orderController.getOrderById);
module.exports = router;
