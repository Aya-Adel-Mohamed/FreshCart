import axios from "axios";

export const getBrands = async (signal) => {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`, {
            signal: signal
        });
        return data.data
    } catch (error) {
    
    }
}

