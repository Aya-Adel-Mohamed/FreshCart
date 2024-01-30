import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ResetCode.module.css";


export default function ResetCode() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendCode(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
      .catch((err) => {
        setError(err.response.data.message)
        setLoading(false)
      });


    if (data.status === "Success") {
      setLoading(false)
      navigate("/resetPassword")
    }
  }

  const validationSchema = yup.object({
    resetCode: yup.string().required("you can't change your password without reset code"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  return (
    <>
      <div className={`mx-auto py-4 mt-4 ${styles.ContainerWidth}`}>
        <h3 className={`${styles.ResetCodeTitle} mb-4`}>Reset Code</h3>
        {error != null ? <div className={`alert alert-danger mt-2 ${styles.alert}`}>{error}</div> : ""}
        
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="resetCode">please enter the reset code</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control mt-2" type="text" id="resetCode" value={formik.values.resetCode}/>
            {formik.errors.resetCode && formik.touched.resetCode ? <div className={styles.errorAlert}>{formik.errors.resetCode}</div> : null}
         </div>
          {loading?
            <button type='button' className='btn bg-main text-white d-flex ms-auto py-2 px-2'><i className='fas fa-spinner fa-spin'></i></button>
            :
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white d-flex ms-auto">verify</button>
          }
          </form>
      </div>
    </>
  );
}