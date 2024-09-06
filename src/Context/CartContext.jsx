import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import toast from 'react-hot-toast';
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    let headers = {
        token: localStorage.getItem('userToken')
    };

    const [cart, setCart] = useState(null);

    async function addProductToCart(productId) {
        try {
            setIsLoading(true);
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    productId
                },
                {
                    headers
                }
            );

            setCart(data)
            toast.success(data.message, {
                duration: 2000
            })
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            toast.error(data.message, {
                duration: 2000
            })
        }
    }


    async function getCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                }
            );
            setCart(data)
        } catch (err) {
        }
    }

    async function updateProductCount(productId, count) {
        if (count > 0) {
            try {
                setIsLoading(true);
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    {
                        count
                    },
                    {
                        headers
                    }
                )
                setCart(data);
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false);
            }
        } else {
            removeProductCart(productId);
        }
    }

    async function removeProductCart(productId) {
        try {
            setIsLoading(true);
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers
                }
            );

            setCart(data)
            setIsLoading(false);
            toast.success('product removed from cart', {
                duration: 2000
            })
        } catch (err) {
            setIsLoading(false);
            toast.error("product didn't removed", {
                duration: 2000
            })
        }
    }

    async function clearCart() {
        try {
            setIsLoading(true);
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                }
            );

            setCart(null)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }

    async function handleCheckout(shippingadress) {
        try {
            setIsLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.cartId}?url=http://localhost:5173`,
                {
                    shippingadress
                },
                {
                    headers
                }
            )

            setIsLoading(false);
            window.location.href = data?.session.url;
        } catch (err) {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        localStorage.getItem('userToken')

        getCart()
    }, [localStorage.getItem('userToken')]);

    return (
        <>
            <CartContext.Provider value={{ addProductToCart, getCart, cart, setCart, updateProductCount, isLoading, removeProductCart, clearCart, handleCheckout }}>
                {children}
            </CartContext.Provider>
        </>
    )
}
