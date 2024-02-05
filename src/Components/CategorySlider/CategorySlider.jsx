import React, { useEffect, useState } from 'react';
import styles from './CategorySlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getCategories() {
        setLoading(true);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
        setLoading(false);
    }
    useEffect(() => {
        getCategories();
    }, [])
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
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

       <div key={index} >
       <img src={category.image} height={230} className='w-100' alt="" />
           <h2 className='h4 pt-2 font'>{category.name}</h2>
       </div>
   
           )}
        </Slider>
        </>
     );
}
 
export default CategorySlider;