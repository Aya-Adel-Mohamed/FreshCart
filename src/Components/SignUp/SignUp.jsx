import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';


const SignUp = () => {
    let navigate = useNavigate();
   async function handleRegister(values){
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        if(data.message === 'success'){
            navigate('/signin')
        }
    }

    let validationSchema = Yup.object({
        name:Yup.string().required('Name is Required').min(3, 'Name minlength is 3').max(10, 'Name maxlength is 10'),
        email:Yup.string().required('Email is Required').email('Email is invalid'),
        password:Yup.string().required('Password is Required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with uppercase ...'),
        rePassword:Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')] , 'Password and rePassword does not match'),
        phone:Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/ , 'Phone must be a valid number'),
    })

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },
        validationSchema,
        onSubmit:handleRegister
    });

    return ( 
        <>
        <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
            <h3 className={`${styles.RegisterTitle} mb-4`}>Register Now</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                <label htmlFor='name'>name</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
                {formik.errors.name && formik.touched.name?  <div className={styles.errorAlert}>{formik.errors.name}</div>: null}
                </div>

               <div className="fprm-group mb-3">
                <label htmlFor='name'>email</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                {formik.errors.email && formik.touched.email?  <div className={styles.errorAlert}>{formik.errors.email}</div>: null}
               </div>

               <div className="form-group mb-3">
                <label htmlFor='name'>password</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password?  <div className={styles.errorAlert}>{formik.errors.password}</div>: null}
               </div>

               <div className="form-group mb-3">
                <label htmlFor='name'>rePassword</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword?  <div className={styles.errorAlert}>{formik.errors.rePassword}</div>: null}
               </div>

               <div className="form-group mb-3">
                <label htmlFor='name'>phone</label>
                <input className='form-control' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
                {formik.errors.phone && formik.touched.phone?  <div className={styles.errorAlert}>{formik.errors.phone}</div>: null}
               </div>

                <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='submit'>SignUp</button>
            </form>
        </div>
        
        </>
     );
}
 
export default SignUp;