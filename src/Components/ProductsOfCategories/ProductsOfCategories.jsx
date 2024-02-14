import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";

const ProductsOfCategories = () => {
    const params = useParams();
    return (
        <>
            <Helmet>
                <title>{`FreshCart | ${params.slug}`}</title>
            </Helmet>
            <FeaturedProducts slug={params.slug} />
        </>
    );
}

export default ProductsOfCategories;