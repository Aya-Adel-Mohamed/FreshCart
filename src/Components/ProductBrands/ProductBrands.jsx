import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";
const ProductBrands = () => {
    const params = useParams();

    return (
        <>
            <Helmet>
                <title>{`FreshCart | ${params.brandSlug}`}</title>
            </Helmet>
            <FeaturedProducts brandSlug={params.brandSlug} />
        </>
    );
}

export default ProductBrands;