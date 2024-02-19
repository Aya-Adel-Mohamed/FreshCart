import axios from "axios";

export const getProductDetails = async (signal, id) => {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
            signal:signal
        });
        return data.data
    } catch (error) {
    }
}