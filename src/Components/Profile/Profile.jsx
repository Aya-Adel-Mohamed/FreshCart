import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Profile.module.css'
const Profile = ({userData}) => {
    console.log(userData);

    function handleUpdateUserData(){
        console.log("userData");
    }
    let validationSchema = Yup.object({
        name: Yup.string().required('Name is Required').min(3, 'Name minlength is 3').max(10, 'Name maxlength is 10'),
        email: Yup.string().required('Email is Required').email('Email is invalid'),
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid number'),
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validationSchema,
        onSubmit: handleUpdateUserData,
    });
    return ( 
        <>
        <section>
            <div className="row justify-content-center align-items-center my-5">
                <div className="profile-content d-flex justify-content-center align-items-center flex-column">
                  <div className={styles.icon}>
                  <i className="fa fa-user-alt fa-3x text-main"></i>
                  </div>
                  <form onSubmit={formik.handleSubmit} className="w-50 mt-4">
                   <h4 className="font text-black">Update Logged user Data</h4>
                    {/* {resError != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{resError}</div> : ''} */}
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
                        <label htmlFor='phone'>phone</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
                        {formik.errors.phone && formik.touched.phone ? <div className={styles.errorAlert}>{formik.errors.phone}</div> : null}
                    </div>
                    {/* {isLoading ? */}
                        {/* <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button> */}
                        {/* : */}
                        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-flex ms-auto' type='submit'>Update</button>
                    {/* } */}
                </form>
                </div>

            </div>
        </section>
        </>
     );
}
 
export default Profile;