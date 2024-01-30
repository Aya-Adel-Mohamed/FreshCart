import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendEmail(values) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
        .catch((err) => {
            setError(err.response.data.message);
            setLoading(false)

        });

        if (data.statusMsg === "success") {
            setLoading(false);
            navigate("/resetCode");
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email("wrong email").required("email is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: sendEmail,
    });

    return (
        <>
            <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
                <h3 className={`${styles.ForgetTitle} mb-4`}>Forget Password</h3>
                {error != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{error}</div> : ""}

                <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">please enter your email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control mt-2" type="email" id="email" value={formik.values.email}/>
                    {formik.errors.email && formik.touched.email ?<div className={styles.errorAlert}>{formik.errors.email}</div> : null}
                </div>

                {loading?
                    <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
                    :
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-3 d-flex ms-auto">send</button>
                }
                </form>
            </div>
        </>
    );
}
 
export default ForgetPassword;