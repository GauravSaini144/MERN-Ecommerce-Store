import express from "express";
import {createProduct, getProducts,createProductReview,deleteProduct,deleteReview,getAllProduct, getProductReviews, productDetail, updateProduct} from "../controllers/productController.js";
const router=express.Router();
import {isAuthenticatedUser, authorizeRoles} from "../middleware/auth.js";

router.route("/products").get(getAllProduct);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
router.route("/product/:id").get(productDetail);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
export default router;