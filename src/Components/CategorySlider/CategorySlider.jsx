import React from 'react';
import Slider from "react-slick";
import { useQuery } from 'react-query';
import { getCategories } from '../../apis/categories.api';
import styles from './CategorySlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const CategorySlider = () => {

  const { data: categories} = useQuery({
    queryKey:["categoriesSlider"],
    queryFn: ({ signal }) => getCategories(signal),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) =>{
    },
    keepPreviousData: true
})

    var settings = {
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        
        responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 900,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
            {
              breakpoint: 668,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 350,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
          ]
    };
    return ( 
        <>
        <h4 className='mt-5 fw-semibold mb-3'>Shop Popular Categories</h4>
        <Slider {...settings}>      
           {categories?.map((category,index)=>
               <Link className='text-decoration-none text-black' to={`categories/productcategories/${category.slug}`} key={index}>
          
            <img src={category.image} height={220} className={`${styles.image} w-100`} alt="" />
           <h2 className='h4 pt-2 font'>{category.name}</h2>
       
               </Link>
           )}
        </Slider>
        </>
     );
}
 
export default CategorySlider;