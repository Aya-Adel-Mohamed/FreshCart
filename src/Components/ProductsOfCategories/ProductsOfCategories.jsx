import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const ProductsOfCategories = () => {
    const params = useParams();
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{`FreshCart | ${params.slug}`}</title>
                </Helmet>
                <FeaturedProducts slug={params.slug} />
            </HelmetProvider>
        </>
    );
}
export default ProductsOfCategories;