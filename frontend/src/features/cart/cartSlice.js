import { createSlice } from "@reduxjs/toolkit";
const initialState={
item:null,
cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
};

const cartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
        addToCart(state, action){
            state.item=action.payload;

            const isItemExist=state.cartItems.find((i)=>i.product===state.item.product);
            if(isItemExist){
              
                state.cartItems=state.cartItems.map((i)=>
                i.product=== isItemExist.product?state.item:i);
                state={...state};
               
            }
            else{
            state.cartItems=[...state.cartItems,state.item];
              state={...state};
                
            }
        },

        removeFromCart(state, action){
            state.item=action.payload;

            state.cartItems=state.cartItems.filter((item)=>{
                if( item.product===state.item.product){

                }
                else{
                    return item;
                }
               
            })
        },

        addShippingInfo(state, action){
            state.shippingInfo=action.payload;
        }
    }
})


export const{addToCart, removeFromCart, addShippingInfo} = cartSlice.actions;
export default cartSlice.reducer;