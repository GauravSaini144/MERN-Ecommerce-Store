import axios from "axios";
import { addShippingInfo, addToCart , removeFromCart} from "./cartSlice";


export const addItemsToCart=(id, quantity)=>async(dispatch, getState)=>{

    const {data}=await axios.get(`https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/product/${id}`);
    dispatch(addToCart({
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        stock:data.product.stock,
        quantity,
    }
));

localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
}

export const removeItem=(id)=>async(dispatch, getState)=>{
    const {data}=await axios.get(`https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/product/${id}`);
    dispatch(removeFromCart({
        product:data.product._id
       
    }));
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));

}

export const setShippingInfo=(shipInfo)=>async(dispatch, getState)=>{

    await dispatch(addShippingInfo(shipInfo));
    localStorage.setItem("shippingInfo", JSON.stringify(getState().Cart.shippingInfo));


}