import React,{useState} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import {UpdateUserLoggedPassword} from '../../../apis/profile.api'

import styles from './UpdateUserPassword.module.css';
const UpdateUserPassword = () => {
   
    const [passwordShown, setPasswordShown] = useState(false);
    const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
    const [rePasswordShown, setRePasswordShown] = useState(false);

    const toggleCurrentPasswordVisiblity = () => {
        setCurrentPasswordShown(currentPasswordShown ? false : true);
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const toggleRePasswordVisiblity = () => {
        setRePasswordShown(rePasswordShown ? false : true);
    }
    const { isLoading, mutate, error } = useMutation({
        mutationFn: UpdateUserLoggedPassword,
        onSuccess: async (data, values) => {
            toast.success('Profile successfully updated', {
                position: 'bottom-left',
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        },
    })

    let validationSchema = Yup.object({
        currentPassword: Yup.string().required('Password is Required').matches(/[A-Z][a-z0-9]{4,20}$/, 'Password must start with uppercase ...'),
        password: Yup.string().required('Password is Required').matches(/[A-Z][a-z0-9]{4,20}$/, 'Password must start with uppercase ...'),
        rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')], 'Password and rePassword does not match'),
    })

    let formik = useFormik({
        initialValues: {
            currentPassword:'',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        },
    });
    return ( 
        <>
                <section>
            <div className="row justify-content-center align-items-center my-5">
                <div className="profile-content d-flex justify-content-center align-items-center flex-column">
                  <div>
                  {/* <i className="fa fa-user-alt fa-3x text-main"></i> */}
                  <i className="fa-solid fa-user-gear fa-4x text-main"></i>
                  </div>
                  <form onSubmit={formik.handleSubmit}  className="w-50 mt-4">
                    {/* {resError != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{resError}</div> : ''} */}
           

                    <div className="form-group mb-3">
                        <label htmlFor='currentPassword'>currentPassword</label>
                        <div className="position-relative">
                            <input className='form-control position-relative' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword} type={currentPasswordShown ? "text" : "password"} name={currentPasswordShown ? "text" : "currentPassword"} id="currentPassword" />

                            <i onClick={toggleCurrentPasswordVisiblity} className={currentPasswordShown ? `fa-solid fa-eye ${styles.eyeIcon}` : `fa-solid fa-eye-slash ${styles.eyeIcon}`}></i>
                        </div>
                        {formik.errors.currentPassword && formik.touched.currentPassword ? <div className={styles.errorAlert}>{formik.errors.currentPassword}</div> : null}
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

                    {/* {isLoading ? */}
                        {/* <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button> */}
                        {/* : */}
                        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-flex ms-auto' type='submit'>Update User Password</button>
                    {/* } */}
                </form>
                </div>

</div>
</section>
        </>
     );
}
 
export default UpdateUserPassword;