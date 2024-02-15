import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();
let userToken = localStorage.getItem('userToken');

let headers = {
    token:userToken
}

function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:id
    },{
        headers
    }).then((response)=>response)
    .catch((error)=>error)
}
function removeFromCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers
    }).then((response)=> response)
    .catch((error)=> error)
}
function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>response)
    .catch((error)=> error)
}

export default function CartContextProvider(props){
    return <CartContext.Provider value={{ addToCart , getLoggedUserCart ,removeFromCart}}>
        {props.children}
    </CartContext.Provider>
}