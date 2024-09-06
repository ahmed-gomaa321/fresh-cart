import React, { useEffect } from 'react'
import style from './WishList.module.css'
import { useContext } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
export default function WishList() {
    let { wishlist, isLoader, getWishlist, removeProductFromWishlist } = useContext(wishlistContext);
    let { addProductToCart, isLoading } = useContext(CartContext);

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <>
            <Helmet>
                <title>Wishlist</title>
            </Helmet>
            <div className={`${isLoader || isLoading ? "visible" : "hidden"} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black  bg-opacity-50 z-40`}>
                <Loader />
            </div>

            <div className="container w-3/4 shadow-md sm:rounded-lg my-10 p-4 pb-8 bg-gray-200">
                <div className="sm:rounded-lg p-4">
                    <p className='text-3xl font-semibold'>My Wish List</p>
                </div>

                <div className='px-4'>
                    {wishlist?.data?.map((product) =>
                        <div key={product?._id} className='flex flex-wrap justify-between items-center border-b-2 border-gray-300 w-full py-4'>
                            <div className='flex flex-wrap items-center md:w-3/4'>
                                <div className='p-4'>
                                    <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded-md" alt={product?.title} />
                                </div>
                                <div className='font-semibold'>
                                    <p>{product?.title}</p>
                                    <p className='py-2'>{product?.price} <span className='text-green-600'>EGP</span></p>
                                    <div className='font-light'>
                                        <span onClick={() => removeProductFromWishlist(product?._id)} className='text-red-600 cursor-pointer hover:text-red-700'>
                                            <i className='fas fa-trash text-red-600 hover:text-red-700 pr-1'></i>
                                            remove
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6 md:mt-0'>
                                <button onClick={() => addProductToCart(product?._id)} className='px-6 py-3 border-2 border-green-500 hover:bg-green-700 hover:text-white rounded-md text-md font-semibold'>Add To Cart</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}