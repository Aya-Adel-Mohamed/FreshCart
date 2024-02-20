import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css";
import { useMutation } from "react-query";
import { sendEmail } from "../../apis/forgetPassword.api";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
    let navigate = useNavigate()
    const { isLoading, mutate, error } = useMutation({
        mutationFn: sendEmail,
        onSuccess: (data, values) => {
            navigate("/resetCode");
        },
    })
    const resError = error ? error.response.data.message : null;
    let validationSchema = yup.object({
        email: yup.string().email("wrong email").required("email is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    });

    return (
        <>
           <Helmet>
                <title>FreshCart | ForgetPassword</title>
            </Helmet>
            <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
                <h3 className={`${styles.ForgetTitle} mb-4`}>Forget Password</h3>
                {resError != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{resError}</div> : ""}
                <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">please enter your email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control mt-2" type="email" id="email" value={formik.values.email}/>
                    {formik.errors.email && formik.touched.email ?<div className={styles.errorAlert}>{formik.errors.email}</div> : null}
                </div>
                {isLoading?
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