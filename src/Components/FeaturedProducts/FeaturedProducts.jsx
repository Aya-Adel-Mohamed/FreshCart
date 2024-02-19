import React from 'react';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getProducts } from '../../apis/products.api';
import styles from './FeaturedProducts.module.css';
import { queryClient } from '../../apis/query.clint.js';
import { addToCart } from '../../apis/cart.api';
import toast from 'react-hot-toast';
const FeaturedProducts = ({ slug, brandSlug }) => {
    const { isFetching, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: ({ signal }) => getProducts(signal, slug, brandSlug),
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onError: (err) => {
        },
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
            {isFetching ? <Loading /> :
                <>
                    <div className={`row mt-5 ${styles.padding}`}>
                        {products?.length === 0 ? <>
                            <div className={`${styles.notFoundProduct}`}>
                                <p >No Products Found</p>
                            </div>
                        </> :
                            <>
                                {products?.map((product, index) =>
                                    <div key={index} className="col-xl-2 col-lg-3 col-md-4">
                                        <div className="product px-3 py-3 cursor-pointer">
                                            <Link to={`/productdetails/${product.id}`} className='productDetails'>
                                                <i className='fa-regular fa-heart text-main pb-2 fs-4'></i>
                                                <img src={product.imageCover} className='w-100 mb-2' alt="" />
                                                <span className='font text-main font-sm pt-5'>{product.category.name}</span>
                                                <h3 className='fw-bolder h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className={styles.price}>{product.price} EGP</span>
                                                    <span ><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                                                </div>
                                            </Link>
                                            <button className='btn bg-main text-white w-100 mt-2' onClick={() => mutate(product.id)} ><i className="fa-solid fa-cart-shopping me-2"></i> Add to cart</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                    </div>

                </>}
        </>
    );
}
export default FeaturedProducts;