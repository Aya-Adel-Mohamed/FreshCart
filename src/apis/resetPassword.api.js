import axios from 'axios';

export const changePassword = async (values) => {
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
        return data
}
