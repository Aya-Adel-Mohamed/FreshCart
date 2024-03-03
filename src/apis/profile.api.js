import axios from "axios";

export const UpdateUserProfile = async (values) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,values,{
            headers
        });
        return data
}