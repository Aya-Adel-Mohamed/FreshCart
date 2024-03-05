import axios from "axios";

export const UpdateUserProfile = async (values) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,values,{
            headers
        });
        return data
}
export const UpdateUserLoggedPassword = async (values) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values,{
            headers
        });
        return data
}
export const getUserAddress = async () => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{
            headers
        });
        return data
}
export const addAddress = async (values) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`,values,{
            headers
        });
        return data
}
export const removeAddress = async (userAddressId) => {
    let headers = { token:localStorage.getItem('userToken') }
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${userAddressId}`,{
            headers
        });
        return data
}