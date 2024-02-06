import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import shopping from '../../assets/shopping2.png'


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading,setLoading] = useState(false)
    async function getCategories(){
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
        setLoading(false)
    }
    useEffect(()=>{
        getCategories();
    },[])

    return ( 
        <>
        {loading?<Loading/>:
        <>
        <div className="row mt-5 justify-content-center">
       {/* <div className="col-12 d-flex justify-content-center align-items-center mb-5">
      <div className="position-relative w-35">
      <img src={shopping} alt="" className='w-100 position-relative'/>
       <div className={`position-absolute ${styles.layer}`}>

       </div>
      </div>
       </div> */}
            {categories?.map((cat,index)=>
            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-5 ${styles.container}`} key={index}>
                <div className={`${styles.categoryContainer}`}>
                    <img src={cat.image} alt="" className='w-100' height={225}/>
                    <span>{cat.name}</span>
                </div>
            </div>
            )}
        </div>

        </>
        }
        
        </>
     );
}
 
export default Categories;