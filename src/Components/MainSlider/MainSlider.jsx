import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slider1 from '../../assets/backgroundSliderHome/slider-image-3.jpeg';
import slider2 from '../../assets/backgroundSliderHome/slider-image-2.jpeg';
import slider3 from '../../assets/backgroundSliderHome/slider-image-1.jpeg';
import banner1 from '../../assets/backgroundSliderHome/slider-2.jpeg';
import banner3 from '../../assets/backgroundSliderHome/grocery-banner.png';
import banner2 from '../../assets/backgroundSliderHome/grocery-banner-2.jpeg';
const MainSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    waitForAnimate: false,
  };
  return (
    <>
      <div className="height mediaLarge mt-5 ps-3">
        <Slider {...settings}>
          <div className="row d-flex">
            <div className="col-7 ">
              <img src={slider1} alt="" className='w-100' />
            </div>
            <div className="col-5 ">
              <div className="row flex-column gapSlider">
                <img src={banner1} alt="" className='w-100' height={225} />
                <img src={banner2} alt="" className='w-100' height={225} />
              </div>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-7 ">
              <img src={slider2} alt="" className='w-100' />
            </div>
            <div className="col-5 ">
              <div className="row flex-column gapSlider2">
                <img src={banner2} alt="" className='w-100' height={230} />
                <img src={banner3} alt="" className='w-100' height={230} />
              </div>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-7 ">
              <img src={slider3} alt="" className='w-100' />
            </div>
            <div className="col-5">
              <div className="row flex-column gapSlider">
                <img src={banner1} alt="" className='w-100' height={225} />
                <img src={banner2} alt="" className='w-100' height={225} />
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div className=" mediaSmall d-none mt-5">
        <Slider {...settings}>
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 ">
              <img src={slider1} alt="" className='w-105' />
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-12 ">
              <img src={slider2} alt="" className='w-105' />
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-12 ">
              <img src={slider3} alt="" className='w-105' />
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}
export default MainSlider;