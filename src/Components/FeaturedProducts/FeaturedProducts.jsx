import React, { useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getProducts() {
        setLoading(true);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProducts(data.data)
        setLoading(false);
    }
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <>
                    <div className="row mt-5">
                        {products?.map((product, index) =>
                            <div key={index} className="col-xl-2 col-lg-3 col-md-4">
                                <Link to={`/productdetails/${product.id}`} className='productDetails'>
                                    <div className="product px-3 py-3 cursor-pointer">
                                        <img src={product.imageCover} className='w-100 mb-2' alt="" />
                                        <span className='font text-main font-sm pt-5'>{product.category.name}</span>
                                        <h3 className='fw-bolder h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className={styles.price}>{product.price} EGP</span>
                                            <span ><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                                        </div>
                                        <button className='btn bg-main text-white w-100 mt-2'><i className="fa-solid fa-cart-shopping me-2"></i> Add to cart</button>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                </>}
        </>
    );
}
export default FeaturedProducts;