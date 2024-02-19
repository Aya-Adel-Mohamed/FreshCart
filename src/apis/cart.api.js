import axios from "axios";

export const getLoggedUserCart = async () => {
    try {
        let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        });
        return data
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (id) => {
    console.log(id);
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:id
        },{
            headers
        });
        return data
}

export const removeFromCart = async (id) => {
    console.log(id);
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
