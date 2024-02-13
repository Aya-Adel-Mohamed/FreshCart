import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import { useMutation } from 'react-query';
import { handleLogin } from '../../apis/signIn.api';


const SignIn = ({ saveUserData }) => {
    let navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordLoginVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    
    const { isLoading, mutate, error } = useMutation({

        mutationFn: handleLogin,
        onSuccess: (data, values) => {
            localStorage.setItem('userToken', data.token)
            saveUserData();
            navigate('/')
        },
    })
    const resError = error ? error.response.data.message : null;

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is Required').email('Email is invalid'),
        password: Yup.string().required('Password is Required').matches(/[A-Z][a-z0-9]{4,20}$/, 'Password must start with uppercase ...'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    });

    return (
        <>
            <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
                <h3 className={`${styles.LoginTitle} mb-4`}>Login Now</h3>
                <form onSubmit={formik.handleSubmit}>
                    {resError != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{resError}</div> : ''}
                    <div className="form-group mb-3">
                        <label htmlFor='email'>email</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                        {formik.errors.email && formik.touched.email ? <div className={styles.errorAlert}>{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor='password'>password</label>
                        <div className="position-relative">
                            <input className='form-control position-relative' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type={passwordShown ? "text" : "password"} id="password" />
                            <i onClick={togglePasswordLoginVisiblity} className={passwordShown ? `fa-solid fa-eye ${styles.eyeIcon}` : `fa-solid fa-eye-slash ${styles.eyeIcon}`}></i>
                        </div>
                        {formik.errors.password && formik.touched.password ? <div className={styles.errorAlert}>{formik.errors.password}</div> : null}
                    </div>
                    <div className="d-flex mb-3 flex-wrap">
                        <span className={styles.fontFami}>Don't have an account?
                            <Link className={`${styles.textColor} fs-6`} to={"/signup"}><strong> Create Account</strong>
                            </Link></span>
                        <Link className={`${styles.textColor} ${styles.fontFami} fs-6 ms-auto`} to={"/forgetPassword"}>
                            <strong>Forgot password?</strong>
                        </Link>
                    </div>
                    {isLoading ?
                        <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-flex ms-auto' type='submit'>Login</button>
                    }

                </form>
            </div>

        </>
    );
}

export default SignIn;