import axios from 'axios';

export const changePassword = async (values) => {
    console.log(values);
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
        console.log(data);
        return data
}
