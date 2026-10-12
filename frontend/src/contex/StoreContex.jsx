import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";


export const StoreContex=createContext(null)

const StoreContexProvider=(props)=>{

    const [cartItems,setCartItems]=useState({})

    const addToCart= (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0
        for(const items in cartItems)
        {
            if(cartItems[items]>0){
            let itemInfo=food_list.find((product)=>product._id===items)
            totalAmount+=itemInfo.price * cartItems[items]
        }
    }
    return totalAmount
    }

    const constextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContex.Provider value={constextValue}>
            {props.children}
        </StoreContex.Provider>
    )
}

export default StoreContexProvider