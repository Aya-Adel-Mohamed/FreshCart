import React from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { useMutation, useQuery } from 'react-query';
import { getProductDetails } from '../../apis/productDetails.api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ProductDetails.module.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import toast from 'react-hot-toast';
import { addToCart } from '../../apis/cart.api';
import { queryClient } from '../../apis/query.clint';

const ProductDetails = () => {
    let params = useParams();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const { isFetching, data: product } = useQuery({
        queryKey: ["productDetails"],
        queryFn: ({ signal }) => getProductDetails(signal, params.id),
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true
    });
    const { isLoading, mutate } = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            toast.success('product successfully added', {
                position: 'bottom-left',
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        },
        onError: (err) => {
            toast.error('error adding product', {
                position: 'bottom-left',
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"])
        }
    })
    
    return (
        <>
        <HelmetProvider>
            {isFetching ? <Loading /> : <>
                <div className="row my-5 justify-content-center">
                    <div className="col-lg-4">
                        {product?.priceAfterDiscount ?
                            <div className="position-relative">
                                <div className={styles.discount}>
                                    Discount
                                </div>
                                {product?.images?.length > 1 ? <>
                                    <Slider {...settings}>
                                        {product?.images?.map((img, index) =>
                                            <img src={img} className='w-100' key={index} alt='' />
                                        )}
                                    </Slider></> : <img src={product.images} className='w-100' alt='' />
                                }
                            </div>
                            :
                            <>
                                {product?.images?.length > 1 ? <>
                                    <Slider {...settings}>
                                        {product?.images?.map((img, index) =>
                                            <img src={img} className='w-100' key={index} alt='' />
                                        )}
                                    </Slider></> : <img src={product.images} className='w-100' alt='' />
                                }
                            </>
                        }
                    </div>
                    <div className="col-lg-8 mt-5">
                        <Helmet>
                            <title>{`FreshCart | ${product?.title} Product`}</title>
                        </Helmet>
                        <span className='fw-bold text-main '>{product?.category?.name}</span>
                        <h3 className={styles.productName}>{product?.title}</h3>

                        <p className='pt-4'>{product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            {product?.priceAfterDiscount ?
                                <div className="d-flex gap align-items-center">
                                    <span className='text-muted text-decoration-line-through fw-bold fs-5'>{product?.price} EGP</span>
                                    <span className='text-main fw-bold fs-5'>{product?.priceAfterDiscount} EGP</span>
                                </div>
                                : <span className='text-main fw-bold fs-5'>{product?.price} EGP</span>
                            }
                            <span className='fw-bold fs-5'><i className='fas fa-star rating-color me-2'></i>{product?.ratingsAverage}</span>
                        </div>
                        <div className="d-flex align-items-center font mt-2">
                            <img src={product?.brand?.image} className={styles.brandImg} alt="" />
                            <span className={styles.brandFont}>{product?.brand?.name}<span className={`text-main ms-2 ${styles.brandText}`}>(Brand)</span></span>
                        </div>
                        <button className='btn bg-main text-white mt-2 w-100' onClick={() => mutate(product.id)}><i className="fa-solid fa-cart-shopping me-2"></i> Add to cart</button>
                    </div>
                </div>
            </>}
            </HelmetProvider>
        </>
    );


}

export default ProductDetails;