import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const wishlistContext = createContext();
export default function WishlistContextprovider({ children }) {
    // all products array
    const [recentProduct, setRecentProduct] = useState([]);

    const [isLoader, setIsLoader] = useState(false);
    // curent id
    const [currentIds, setCurrentIds] = useState([]);
    // wishlist data
    const [wishlist, setWishlist] = useState([]);

    let headers = {
        token: localStorage.getItem('userToken')
    };

    // get All products 
    async function getProducts() {
        try {
            setIsLoader(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            setRecentProduct(data.data);
            setIsLoader(false);
        } catch (err) {

        }
    }

    async function addProductToWishlist(productId) {
        try {
            setIsLoader(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId
                },
                {
                    headers
                }
            )
            setCurrentIds(data?.data);
            setWishlist(data);
            toast.success(data.message, {
                duration: 2000
            })
            setIsLoader(false);
        } catch (err) {

            setIsLoader(false)
            toast.error(data.message, {
                duration: 2000
            })
        } finally {
            setIsLoader(false);
        }

    }

    async function getWishlist() {
        try {
            setIsLoader(true)
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers }
            )
            setWishlist(data);
            setCurrentIds(data?.data.map((item) => item.id));
            setIsLoader(false)
        } catch (err) {
            setIsLoader(false);

        } finally {
            setIsLoader(false);
        }
    }

    async function removeProductFromWishlist(Id) {
        try {
            setIsLoader(true)
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,
                { headers }
            );
            toast.success(data.message, {
                duration: 2000
            })

            setWishlist(prevWishlist => prevWishlist?.data.filter((item) => item?.id !== Id))
            setIsLoader(false)
        } catch (err) {

            toast.error("product didn't removed", {
                duration: 2000
            })
        } finally {
            setIsLoader(false)
        }
    }


    useEffect(() => {
        getWishlist();
    }, [wishlist?.count]);

    return (
        <>
            <wishlistContext.Provider value={{ addProductToWishlist, isLoader, wishlist, currentIds, getWishlist, removeProductFromWishlist, recentProduct, getProducts }}>
                {children}
            </wishlistContext.Provider>
        </>
    )
}
