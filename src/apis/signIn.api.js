import axios from 'axios';

export const handleLogin = async (values) => {
    console.log(values);
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
        console.log(data);
        return data

}

