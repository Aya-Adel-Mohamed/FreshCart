import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

const ProductsOfCategories = () => {
    const params = useParams();
    return ( 
        <>
       <FeaturedProducts slug={params.slug}/>
        </>
     );
}
 
export default ProductsOfCategories;