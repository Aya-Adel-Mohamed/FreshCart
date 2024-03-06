import axios from "axios";

export const getLoggedUserWishlist = async () => {
    try {
        let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        });
        return data
    } catch (error) {
    }
}

export const addToWishList = async (id) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId:id
        },{
            headers
        });
        return data
}
export const removeFromWishList = async (id) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        });
        return data
}