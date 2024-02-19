import React from "react";
import Loading from '../Loading/Loading.jsx';
import styles from './Cart.module.css';
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { getLoggedUserCart, removeFromCart } from "../../apis/cart.api.js";
import { queryClient } from "../../apis/query.clint.js";
const Cart = () => {
    const { isFetching, data: cartDetails } = useQuery({
        queryKey: ["cart"],
        queryFn: getLoggedUserCart,
        refetchOnMount:true,
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.log(err);
        },

        keepPreviousData: true,
    });
console.log(cartDetails);
    const { isLoading, mutate } = useMutation({
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
            console.log(err);
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
    return (
        <>
            {isFetching ? <Loading /> :
            
                <div className=" mx-auto bg-secondary-light my-5 p-lg-5 p-3">
                    <h3 className="font fs-2 pb-2">Shopping Cart</h3>
                    <h5 className="font border-bottom-1"><span className="text-main">Cart Items: </span>{cartDetails == undefined? 0 :cartDetails?.numOfCartItems}</h5>

                    <div className="row ">
                        {cartDetails == undefined || cartDetails?.data.products.length == 0 ? <><p className="my-3 py-5 text-main fs-1 text-center font">No Items Found in Cart</p></> : <>

                            {cartDetails?.data.products.map((product, index) =>
                                <div className="contentCart d-flex align-items-center flex-wrap border-bottom-1" key={index}>
                                    <div className="col-lg-9 my-3">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <img src={product.product.imageCover} className='w-100' alt="" />
                                            </div>
                                            <div className="col-lg-10 d-flex flex-column pt-4" >
                                                <span className="font fw-lighter fs-4">{product.product.title}</span>
                                                <span className="text-main font fs-5">Price: <span className="text-black">{product.price * product.count} EGP</span></span>                                                
                                                <span className="fs-5 font pt-4 cursor-pointer" onClick={() => mutate(product.product.id)}><i className=" me-2 text-main fa-regular fa-trash-can"></i>Remove</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 my-3 d-flex justify-content-end align-items-center">
                                        <div className="quantity font fs-5">
                                            <button className={styles.btnQty}>+</button>
                                            <span className="px-3">{product.count}</span>
                                            <button className={styles.btnQty}>-</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )}
                        </>}
                        <div className="totalPrice d-flex justify-content-end">
                            <span className="font text-main fs-4 pt-3">Total Price: <span className="text-black">{cartDetails == undefined ? 0 : cartDetails?.data.totalCartPrice} EGP</span></span>
                        </div>
                    </div>


                </div>
            }
            {/* {cartDetails ? <>
           

            </> :
                <>
                    <Loading />
                </>}  */}
        </>
    );
}

export default Cart;