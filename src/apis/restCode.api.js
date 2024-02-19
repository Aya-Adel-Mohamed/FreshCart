import axios from 'axios';

export const sendCode = async (values) => {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
        return data
}
