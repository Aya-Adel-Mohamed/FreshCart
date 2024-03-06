import React, { useState } from "react";
import styles from './WishList.module.css';
import { useMutation, useQuery } from "react-query";
import { getLoggedUserWishlist, removeFromWishList } from "../../apis/wishlist.api";
import toast from "react-hot-toast";
import { queryClient } from "../../apis/query.clint";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "../ReusableCompnents/ScrollToTop/ScrollToTop";
const WishList = () => {
    const [loading, setloading] = useState(true)
    setTimeout(() => {
        setloading(false)
    }, 2000);
    const { isFetching, data: wishlistDetails } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getLoggedUserWishlist,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        keepPreviousData: true,
    });
    const { isLoading, mutate } = useMutation({
        mutationFn: removeFromWishList,
        onSuccess: () => {
            toast.success('product successfully removed', {
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
            toast.error('error removing product', {
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
            queryClient.invalidateQueries(["wishlist"])
        }
    })
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>FreshCart | WishList</title>
            </Helmet>
            {loading ? <Loading /> :
                <div className=" mx-auto bg-secondary-light my-5 p-lg-5 p-3">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i className="fa-regular fa-heart ms-2 fs-2 mb-2"></i>
                        <h3 className="font fs-2 pb-3 d-flex align-items-center">My Wishlist</h3>
                    </div>
                    <h5 className="font border-bottom-1"><span className="text-main">wishlist Items: </span>{wishlistDetails == undefined ? 0 : wishlistDetails?.count}</h5>
                    <div className="row ">
                        {wishlistDetails == undefined || wishlistDetails?.data.length == 0 ? <><p className="my-3 py-5 text-main fs-1 text-center font">No Items Found in WishList</p></> : <>
                            {wishlistDetails?.data.map((product, index) =>
                                <div className="contentCart d-flex align-items-center flex-wrap border-bottom-1" key={index}>
                                    <div className="col-lg-9 my-3">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <Link to={`/productdetails/${product.id}`}>
                                                    <img src={product.imageCover} className='w-100' alt="" />
                                                </Link>
                                            </div>
                                            <div className="col-lg-10 d-flex flex-column" >
                                                <span className="font fw-lighter fs-4">{product.title}</span>
                                                <span className={`${styles.category} font mb-2`}>{product.category.name}</span>
                                                {product.priceAfterDiscount ?
                                                    <>
                                                        <span className="text-main font fs-5">Price: <span className="text-black text-decoration-line-through me-2 text-muted">{product.price} EGP</span><span className="text-black">{product.priceAfterDiscount} EGP</span></span>
                                                    </>
                                                    :
                                                    <span className="text-main font fs-5">Price: <span className="text-black">{product.price} EGP</span></span>
                                                }
                                                <span className="fs-5 font pt-4 cursor-pointer Remove" onClick={() => mutate(product.id)}><i className="me-2 text-main fa-regular fa-trash-can"></i>Remove</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 my-3 d-flex justify-content-end align-items-center">
                                        <span className="font fs-5"><i className="fas fa-star rating-color me-2"></i>{product.ratingsAverage}</span>
                                    </div>
                                    <hr />
                                </div>
                            )}
                        </>}
                    </div>
                </div>
            }
            <ScrollToTop/>
            </HelmetProvider>
        </>
    );
}
export default WishList;