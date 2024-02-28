import React, { useState } from "react";
import Loading from '../Loading/Loading.jsx';
import styles from './Cart.module.css';
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { getLoggedUserCart, removeFromCart, updateCartProductQuantity } from "../../apis/cart.api.js";
import { queryClient } from "../../apis/query.clint.js";
import ClearCart from "./ClearCart.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = () => {
    const [loading, setloading] = useState(true)
    setTimeout(() => {
        setloading(false)
    }, 2000);

    const { isFetching, data: cartDetails } = useQuery({
        queryKey: ["cart"],
        queryFn: getLoggedUserCart,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    console.log(cartDetails);
    const { isLoading: removeLoading, mutate: removeMutate } = useMutation({
        mutationFn: removeFromCart,
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
            queryClient.invalidateQueries(["cart"])
        }
    })

    const { isLoading: updateLoading, mutate: updateMutate } = useMutation({
        mutationFn: updateCartProductQuantity,
        onError: (err) => {
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"])
        }
    })

    return (
        <>
            <Helmet>
                <title>FreshCart | Cart</title>
            </Helmet>
            {loading ? <Loading /> :
                <>
                    <div className=" mx-auto bg-secondary-light my-5 p-md-5 p-3">
                        <h3 className="font fs-2 pb-2">Shopping Cart</h3>
                        <h5 className="font border-bottom-1"><span className="text-main">Cart Items: </span>{cartDetails == undefined ? 0 : cartDetails?.numOfCartItems}</h5>
                        <div className="row ">
                            {cartDetails == undefined || cartDetails?.data.products.length == 0 ? <><p className="my-3 py-5 text-main fs-1 text-center font">No Items Found in Cart</p></> : <>
                                {cartDetails?.data.products.map((product, index) =>
                                    <div className="contentCart d-flex align-items-center flex-wrap border-bottom-1" key={index}>
                                        <div className="col-md-9 my-3">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Link to={`/productdetails/${product.product.id}`}>
                                                        <img src={product.product.imageCover} className='w-100' alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-md-10 d-flex flex-column pt-4" >
                                                    <span className="font fw-lighter fs-4">{product.product.title}</span>
                                                    <span className="text-main font fs-5">Price: <span className="text-black">{product.price * product.count} EGP</span></span>
                                                    <span className="fs-5 font pt-4 cursor-pointer Remove" onClick={() => removeMutate(product.product.id)}><i className=" me-2 text-main fa-regular fa-trash-can"></i>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 my-3 d-flex justify-content-end align-items-center">
                                            <div className="quantity font fs-5">
                                                <button className={`${styles.btnQty}`} onClick={() => updateMutate({ id: product.product.id, count: product.count + 1 })}>+</button>
                                                <span className="px-3">{product.count}</span>
                                                <button className={`${styles.btnQty}`} disabled={product.count > 1 ? false : true} onClick={() => updateMutate({ id: product.product.id, count: product.count - 1 })}>-</button>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </>}
                            <div className="totalPrice d-flex justify-content-end">
                                <span className="font text-main fs-4 pt-3">Total Price: <span className="text-black">{cartDetails == undefined ? 0 : cartDetails?.data.totalCartPrice} EGP</span></span>
                            </div>
                            {cartDetails?.data.products.length > 0 ? <ClearCart /> : ''}
                        </div>
                    </div>
                    {cartDetails?.data.products.length > 0 ?
                    <div className="d-flex justify-content-center align-items-center gap-x mb-5 flex-responsive-wrap">    
                    
                        <button className="btn bg-main fs-5 text-white font w-25 btn-payment"><Link className={styles.anchor} to='/checkout'>Online Payment</Link></button>
                        <button className="btn bg-main fs-5 text-white font w-25 btn-payment"><Link className={styles.anchor} to='/cash'>Cash On Delivery</Link></button>
                    </div>:''}
                </>
            }
        </>
    );
}

export default Cart;