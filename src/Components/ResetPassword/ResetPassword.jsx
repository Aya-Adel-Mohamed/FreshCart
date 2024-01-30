import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './ResetPassword.module.css';


export default function ResetPassword() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordResetVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
  }

  async function changePassword(values) {
    setLoading(true);
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false)
      });

    if (data.token) {
      setLoading(false)
      navigate("/signin");
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("email not vaild").required("email is required"),
    newPassword: yup.string().matches(/[A-Z][a-z0-9]{4,20}$/, "not valid").required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword
  });

  return (
    <>
      <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
        <h3 className={`${styles.ResetPasswordTitle} mb-4`}>Reset Password</h3>
       {error != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{error}</div>: ""}

      <form  onSubmit={formik.handleSubmit}>
       <div className="form-group mb-3">
       <label htmlFor="resetCode">email</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control mb-3" type="email" id="email" value={formik.values.email}/>
          {formik.errors.email && formik.touched.email ? 
            <div className={styles.errorAlert}>{formik.errors.email}</div>
           : null}
       </div>
       <div className="form-group mb-3">
        <label htmlFor="newPassword">newPassword</label>
        <div className="position-relative">
          <input className='form-control position-relative' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type={passwordShown ? "text" : "password"} id="newPassword" />
          <i onClick={togglePasswordResetVisiblity} className={passwordShown ? `fa-solid fa-eye ${styles.eyeIcon}` : `fa-solid fa-eye-slash ${styles.eyeIcon}`}></i>
        </div>

        {formik.errors.newPassword && formik.touched.newPassword ?
          <div className={styles.errorAlert}>{formik.errors.newPassword}</div>
         : null}
        </div>
        {loading?
        <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
        : 
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white d-flex ms-auto">Reset Password</button>
        }
        </form>
      </div>
    </>
  );
}