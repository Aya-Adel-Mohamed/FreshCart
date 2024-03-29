import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { handleRegister } from '../../apis/signUp.api';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from './SignUp.module.css';

const SignUp = () => {
    let navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [rePasswordShown, setRePasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    const toggleRePasswordVisiblity = () => {
        setRePasswordShown(rePasswordShown ? false : true);
    }
    const { isLoading, mutate, error } = useMutation({
        mutationFn: handleRegister,
        onSuccess: (data, values) => {
            navigate('/signin')
        },
    })
    const resError = error ? error.response.data.message : null;
    let validationSchema = Yup.object({
        name: Yup.string().required('Name is Required').min(3, 'Name minlength is 3').max(10, 'Name maxlength is 10'),
        email: Yup.string().required('Email is Required').email('Email is invalid'),
        password: Yup.string().required('Password is Required').matches(/[A-Z][a-z0-9]{4,20}$/, 'Password must start with uppercase ...'),
        rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')], 'Password and rePassword does not match'),
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid number'),
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    });
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>FreshCart | signUp</title>
                </Helmet>
                <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
                    <h3 className={`${styles.RegisterTitle} mb-4`}>Register Now</h3>
                    <form onSubmit={formik.handleSubmit}>
                        {resError != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{resError}</div> : ''}
                        <div className="form-group mb-3">
                            <label htmlFor='name'>name</label>
                            <input className='form-control ' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
                            {formik.errors.name && formik.touched.name ? <div className={styles.errorAlert}>{formik.errors.name}</div> : null}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='email'>email</label>
                            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                            {formik.errors.email && formik.touched.email ? <div className={styles.errorAlert}>{formik.errors.email}</div> : null}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='password'>password</label>
                            <div className="position-relative">
                                <input className='form-control position-relative' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type={passwordShown ? "text" : "password"} name={passwordShown ? "text" : "password"} id="password" />
                                <i onClick={togglePasswordVisiblity} className={passwordShown ? `fa-solid fa-eye ${styles.eyeIcon}` : `fa-solid fa-eye-slash ${styles.eyeIcon}`}></i>
                            </div>
                            {formik.errors.password && formik.touched.password ? <div className={styles.errorAlert}>{formik.errors.password}</div> : null}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='rePassword'>rePassword</label>
                            <div className="position-relative">
                                <input className='form-control position-relative' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type={rePasswordShown ? "text" : "password"} name="rePassword" id="rePassword" />
                                <i onClick={toggleRePasswordVisiblity} className={rePasswordShown ? `fa-solid fa-eye ${styles.eyeIcon}` : `fa-solid fa-eye-slash ${styles.eyeIcon}`}></i>
                            </div>
                            {formik.errors.rePassword && formik.touched.rePassword ? <div className={styles.errorAlert}>{formik.errors.rePassword}</div> : null}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='phone'>phone</label>
                            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
                            {formik.errors.phone && formik.touched.phone ? <div className={styles.errorAlert}>{formik.errors.phone}</div> : null}
                        </div>
                        {isLoading ?
                            <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
                            :
                            <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-flex ms-auto' type='submit'>Register</button>
                        }
                    </form>
                </div>
            </HelmetProvider>
        </>
    );
}
export default SignUp;