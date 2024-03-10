import axios from 'axios';

export const sendEmail = async (values) => {
       const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
       return data
}

