import {configureStore} from "@reduxjs/toolkit";

import {composeWithDevTools} from "@redux-devtools/extension";
import productReducers from "../features/products/productSlice.js"
import productDetailReducers from "../features/products/DetailSlice.js"
import userReducers from "../features/users/userSlice.js"
import profileReducers from "../features/users/profileSlice.js"
import forgotPasswordReducers from "../features/users/forgotPasswordSlice.js"
import cartReducers from "../features/cart/cartSlice.js"
import newOrderReducers from "../features/orders/orderSlice.js"
import myOrdersReducers from "../features/orders/myOrderSlice.js"
import orderDetailsReducers from "../features/orders/OrderDetailSlice.js"
import newReviewReducers from "../features/reviews/reviewSlice.js"
import adminProductsReducers from "../features/products/adminProductSlice.js";
import newProductReducers from "../features/products/newProductSlice.js";
import removeProductReducers from "../features/products/removeProductSlice.js";
import updateProductReducers from "../features/products/updateProductSlice.js";
import adminOrderReducers from "../features/orders/adminOrderSlice.js";
import updateOrderReducers from "../features/orders/updateOrderSlice.js";
import removeOrderReducers from "../features/orders/removeOrderSlice.js";
import allUserReducers from "../features/users/allUserSlice.js";
import removeUserReducers from "../features/users/removeUserSlice.js";
import userDetailsReducers from "../features/users/userDetailsSlice.js";
import updateUserReducers from "../features/users/updateUserSlice.js";

export const store = configureStore({

reducer:{
   Product: productReducers,
   productDetails:productDetailReducers,
   User:userReducers,
   Profile:profileReducers,
   ForgotPassword:forgotPasswordReducers,
   Cart:cartReducers,
   newOrder:newOrderReducers,
   myOrders:myOrdersReducers,
   orderDetails:orderDetailsReducers,
   newReview:newReviewReducers,
   adminProducts:adminProductsReducers,
   newProduct:newProductReducers,
   removeProduct:removeProductReducers,
   updateProduct:updateProductReducers,
   adminOrders:adminOrderReducers,
   updateOrder:updateOrderReducers,
   removeOrder:removeOrderReducers,
   allUser:allUserReducers,
   removeUser:removeUserReducers,
   userDetail:userDetailsReducers,
   updateUser:updateUserReducers,
},
enhencers:[composeWithDevTools()],

})
