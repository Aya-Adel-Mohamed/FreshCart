import React from 'react';
import styles from './Categories.module.css';
import Loading from '../Loading/Loading.jsx';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCategories } from '../../apis/categories.api.js';
import { Helmet } from 'react-helmet';


const Categories = () => {

    const { isFetching, data: categories} = useQuery({
        queryKey:["categories"],
        queryFn: ({ signal }) => getCategories(signal),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (err) =>{
        },
        keepPreviousData: true
    })

    return ( 
        <>
           <Helmet>
                <title>FreshCart | Categories</title>
            </Helmet>
        {isFetching?<Loading/>:
        <>
        <div className="row mt-5 justify-content-center">
            {categories?.map((cat,index)=>
            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-5 ${styles.container}`} key={index}>
                
                <Link to={`productcategories/${cat.slug}`}>
                <div className={`${styles.categoryContainer}`}>
                    <img src={cat.image} alt="" className='w-100' height={225}/>
                    <span>{cat.name}</span>
                </div>
                </Link>
            </div>
            )}
        </div>

        </>
        }
        
        </>
     );
}
 
export default Categories;