import express from "express";
const router = express.Router();
import {isAuthenticatedUser, authorizeRoles} from "../middleware/auth.js";
import { getSingleOrder, newOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";
router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
export default router;