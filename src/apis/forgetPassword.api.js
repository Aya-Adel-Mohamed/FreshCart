import axios from 'axios';

export const sendEmail = async (values) => {
    console.log(values);
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
        console.log(data);
        return data
}

