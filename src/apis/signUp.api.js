import axios from 'axios';

export const handleRegister = async (values) => {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
    return data
}

