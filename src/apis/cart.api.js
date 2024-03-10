import axios from "axios";

export const getLoggedUserCart = async () => {
    try {
        let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        });
        return data
    } catch (error) {
    }
}

export const addToCart = async (id) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:id
        },{
            headers
        });
        return data
}

export const removeFromCart = async (id) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers
        });
        return data
}

export const clearCart = async () => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        });
        return data
}

export const updateCartProductQuantity = async ({id,count}) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count:count
        },{
            headers
        });
        return data
}

export const onlinePayment = async ({values,cartId}) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress:values
        },{
            headers
        });
        return data
}

export const CashOnDelivery = async ({values,cartId}) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
            shippingAddress:values
        },{
            headers
        });
        return data
}

export const getUserOrders = async (userId) => {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        return data
    } catch (error) {
    }
}