import axios from 'axios';

export const handleRegister = async (values) => {
    console.log(values);
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
        console.log(data);
        return data
}

