import React from "react";
import { useQuery } from "react-query";
import { getUserAddress, removeAddress } from "../../../apis/profile.api.js";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { addAddress } from '../../../apis/profile.api.js';
import styles from './UserAddresses.module.css';
import Loading from "../../Loading/Loading.jsx";
import { queryClient } from "../../../apis/query.clint.js";


const UserAddresses = () => {


    const { isFetching, data: address } = useQuery({
        queryKey: ["address"],
        queryFn: getUserAddress,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });
    console.log(address);
    const { isLoading:addAddressLoading, mutate:addAddressMutate, error:addAddressError } = useMutation({
        mutationFn: addAddress,
        onSuccess: (data, values) => {
            console.log(data);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["address"])
        }
    })
    const { isLoading:removeAddressLoading, mutate:removeAddressMutate, error:removeAddressError } = useMutation({
        mutationFn: removeAddress,
        onSuccess: (data, values) => {
            console.log(data);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["address"])
        }
    })
    let validationSchema = Yup.object({
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid number'),
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            details: '',
            phone: '',
            city: '',
        },
        validationSchema,
        onSubmit: (values) => {
            addAddressMutate(values)
        }
    })
    return (
        <>

        
            <div className="container my-5">
                <div className="row justify-content-center align-items-center py-3">
                    <i className="fa-solid fa-location-dot text-center text-main fa-4x"></i>
                    <form onSubmit={formik.handleSubmit} className="w-75">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control mb-2" name="name" id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="details">Details</label>
                            <input type="text" className="form-control mb-2" name="details" id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" className="form-control mb-2" name="phone" id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.phone && formik.touched.phone ? <div className={styles.errorAlert}>{formik.errors.phone}</div> : null}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control mb-2" name="city" id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                        {addAddressLoading ?
                            <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
                            :
                            <button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2 fs-6" type='submit'>Add Address</button>
                        }
                    </form>

                    <div className="d-flex mt-5 justify-content-center align-items-center flex-column ">
                        {address?.data?.map((ele, index) =>
                            <div className="w-75 bg-light font p-4 mt-3 border-radius">
                                <div className="d-flex">
                                    <div className="col-lg-9">

                                        <h6 className="text-muted">Address #{index}</h6>
                                    </div>
                                    <div className="col-lg-3 text-end">
                                       
                                        <button className="btn border-0 " onClick={()=>removeAddressMutate(ele._id)}>
                                        <i className="fa-solid fa-trash-can text-main "></i>
                                            <span className="ms-2">Remove</span>
                                
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <p className="mb-0"><span className="text-main">name: </span>{ele.name}</p>
                                <p className="mb-0"><span className="text-main">home Details: </span>{ele.details}</p>
                                <p className="mb-0"><span className="text-main">phone: </span>{ele.phone}</p>
                                <p className="mb-0"><span className="text-main">city: </span>{ele.city}</p>
                            </div>
                        )}
                    </div>


                </div>

            </div>
        

        </>
    );
}

export default UserAddresses;