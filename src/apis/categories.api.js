 import axios from 'axios';

export const getCategories = async (signal) => {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`,{
            signal: signal
        });
        return data.data
    } catch (error) {
    }
}