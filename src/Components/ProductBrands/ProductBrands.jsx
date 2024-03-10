import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const ProductBrands = () => {
    const params = useParams();
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{`FreshCart | ${params.brandSlug}`}</title>
                </Helmet>
                <FeaturedProducts brandSlug={params.brandSlug} />
            </HelmetProvider>
        </>
    );
}
export default ProductBrands;