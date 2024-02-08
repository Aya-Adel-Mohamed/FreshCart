import axios from "axios";

export const getProductDetails = async (signal, id) => {
console.log(id);
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
            signal:signal
        });
        return data.data
    } catch (error) {
        console.log(error);
    }
}