import React from "react";
import { useQuery } from "react-query";
import { getUserOrders } from "../../apis/cart.api";
import Loading from '../Loading/Loading.jsx';

const Orders = ({userData}) => {
    console.log(userData);

    const { isFetching, data: orders } = useQuery({
        queryKey: ["orders", userData?.id],
        queryFn: () => getUserOrders(userData?.id),
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    }); 
    console.log(orders);

    return (  
        <>
        {isFetching?<Loading/>:
        
<section className="my-5">
{orders?.map((order,index)=>
        <>
<div className="bg-light p-4 mb-1 border-radius">
<span className="font text-muted">order #{order.id}</span>
        <hr className="mb-2"/>
        {order.cartItems.map((detail,index)=>
        <div className="orderDetails mb-1 d-flex gap flex-wrap">
            <div className="col-md-1">
                <img src={detail.product.imageCover} className="w-100" alt="" />
            </div>
            <div className="col-md-10 d-flex flex-column">
                <span className="font">{detail.product.title}</span>
                <span className="font slug my-2">{detail.product.category.name}</span>
                <span className="font text-main"><span className="text-dark">price: </span>{detail.price} EGP</span>
                <span className="font text-main"><span className="text-dark">count: </span>{detail.count}</span>
            </div>
        </div>
        )}
<p className="font text-main text-end m-0"><span className="text-dark">shipping price: </span> {order.shippingPrice} EGP</p>
<p className="font text-main text-end m-0"><span className="text-dark">tax price: </span> {order.taxPrice} EGP</p>
<p className="font text-main text-end m-0"><span className="text-dark">total price: </span> {order.totalOrderPrice} EGP</p>

        <hr className="mt-1"/>
<span className="font text-main"><span className="text-dark">payment Method Type:</span> {order.paymentMethodType}</span>

</div>
        </>
        )}
</section>
        }
  
        </>
    );
}
 
export default Orders;