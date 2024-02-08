import React from "react";
import { useParams } from 'react-router-dom';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
const ProductBrands = () => {
    const params = useParams();
    console.log(params.brandSlug);
    return (  
        <>
              <FeaturedProducts brandSlug={params.brandSlug}/>
        </>
    );
}
 
export default ProductBrands;