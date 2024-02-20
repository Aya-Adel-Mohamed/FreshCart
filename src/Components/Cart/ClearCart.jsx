import React from 'react';
import { useMutation } from 'react-query';
import { clearCart } from '../../apis/cart.api';
import { queryClient } from '../../apis/query.clint';
import toast from 'react-hot-toast';

const ClearCart = () => {
    const { isLoading, mutate } = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            toast.success('cart successfully removed', {
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
            toast.error('error removing cart', {
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
    return (<>
        <div className="clearCart text-center mt-4">
            <button className="bg-main btn text-white fs-5 px-4" onClick={() => mutate()}>Clear Cart</button>
        </div>
    </>);
}

export default ClearCart;