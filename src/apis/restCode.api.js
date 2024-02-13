import axios from 'axios';

export const sendCode = async (values) => {
    console.log(values);
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
        console.log(data);
        return data
}
