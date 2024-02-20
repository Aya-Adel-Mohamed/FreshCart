import React from "react";
import styles from './WishList.module.css';
import { useQuery } from "react-query";
import { getLoggedUserWishlist } from "../../apis/wishlist.api";

const WishList = () => {

    const { isFetching, data: wishlistDetails } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getLoggedUserWishlist,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onError: (err) => {
        },

        keepPreviousData: true,
    });
    console.log(wishlistDetails);

    return ( 
        <>
        <h1>
            Wishlist
        </h1>
        
        </>
     );
}
 
export default WishList;