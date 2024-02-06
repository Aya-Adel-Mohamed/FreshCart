import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading,setLoading] = useState(false)
    async function getBrands(){
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        setBrands(data.data);
        setLoading(false)
    }
    useEffect(()=>{
        getBrands();
    },[])

    return ( 
        <>
        {loading?<Loading/>:
        <>
        <div className="row my-5">
   
            {brands?.map((brand,index)=>
            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-5 ${styles.container}`} key={index}>
                <div className={`${styles.brandContainer}`}>
                    <img src={brand.image} alt="" className='w-100'/>
                    <span>{brand.name}</span>
                </div>
            </div>
            )}
        </div>

        </>
        }
        
        </>
     );
}
 
export default Brands;