import React, { useState } from "react";
import * as Yup from 'yup';
import styles from './CashCheckout.module.css';
import { useFormik } from "formik";
import payment from '../../assets/backgroundSliderHome/payment.jpg'
import { useMutation, useQuery } from "react-query";
import { CashOnDelivery, getLoggedUserCart } from "../../apis/cart.api";
import { useNavigate } from "react-router-dom";

const CashCheckout = () => {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()
    const { isFetching, data: cartDetails } = useQuery({
        queryKey: ["cart"],
        queryFn: getLoggedUserCart,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    }); 
    let cartId = cartDetails.data._id;
    console.log(cartId);
    const { isLoading, mutate, error } = useMutation({
        mutationFn: CashOnDelivery,
        onSuccess: async (data, values) => {
            console.log(data);   
         navigate('/allorders')

        },
    })
    let validationSchema = Yup.object({
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid number'),
    })

    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        validationSchema,
        onSubmit: (values) => {
            mutate({shippingAddress:values,cartId:cartId})
        }
    })

    return (  
        <>
        <div className="container my-5">
            <div className="row gap-payment-x justify-content-center align-items-center py-3">
                <div className="col-lg-6">
                <form onSubmit={formik.handleSubmit}>
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
                {loading ?
                        <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)}  className="btn bg-main text-white mt-2 fs-6" type='submit'>CheckOut</button>
                }
            </form>
                </div>
                <div className="col-lg-4 d-flex justify-content-end">
                    <img src={payment} alt="" className="w-75" />
                </div>
            </div>
    
        </div>
        </>
    );
}
 
export default CashCheckout;