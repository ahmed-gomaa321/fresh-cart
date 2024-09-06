import React, { useContext, useEffect, useState } from 'react';
import style from './Products.module.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { Helmet } from 'react-helmet';

export default function Products() {
    const { addProductToCart, isLoading } = useContext(CartContext);
    const { addProductToWishlist, isLoader, getProducts, recentProduct, currentIds } = useContext(wishlistContext);

    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');

    // Filter products based on search input
    const filteredProduct = recentProduct.filter((product) =>
        product?.title.toLowerCase().includes(search.toLowerCase())
    );

    // Check if a product is in the wishlist

    const isInWishlist = (productId) => {
        return currentIds.some((id) => id === productId)
    }


    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className={`${loader || isLoader || isLoading ? 'visible' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60`}>
                <Loader />
            </div>
            <div className='container w-5/6'>
                <div className='w-4/5 mt-10 lg:mt-16 mx-auto relative'>
                    <input
                        id='search'
                        onChange={(e) => setSearch(e.target.value)}
                        className='border-2 w-full py-3 px-4 rounded-full focus:outline-none caret-green-700'
                        type='text'
                        placeholder='Search'
                    />
                    <i
                        onClick={() => {
                            document.getElementById('search').value = '';
                            setSearch('');
                        }}
                        className='fas fa-x absolute right-5 text-gray-400 top-1/2 -translate-y-1/2 cursor-pointer'
                    ></i>
                </div>
                <div className='flex flex-wrap pb-4 lg:py-8 items-center px-4'>
                    {filteredProduct.map((product) => (
                        <div key={product.id} className='w-full md:w-1/2 lg:w-1/4 px-2 py-8'>
                            <div className='px-3 py-3 product transition-all duration-500 rounded-md'>
                                <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                                    <img
                                        src={product.imageCover}
                                        className='w-full'
                                        loading='lazy'
                                        alt={product.title.split(' ').slice(0, 2).join(' ')}
                                    />
                                    <div className='px-2'>
                                        <span className='text-green-700'>{product.category.name}</span>
                                        <h2 className='mt-5 text-black font-semibold'>
                                            {product.title.split(' ').slice(0, 2).join(' ')}
                                        </h2>
                                        <div className='flex justify-between pr-2'>
                                            <span>
                                                {product.price} <span className='text-green-700'>EGP</span>
                                            </span>
                                            <span>
                                                <i className='fas fa-star p-1 text-yellow-500'></i>
                                                {product.ratingsAverage}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className='w-full flex justify-between items-center'>
                                    <button
                                        onClick={() => addProductToCart(product.id)}
                                        className='text-center w-3/4 px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-800 my-3 block btn transition-all duration-500'
                                    >
                                        + add to cart
                                    </button>
                                    <i
                                        onClick={() => addProductToWishlist(product.id)}
                                        className={`fas fa-heart text-3xl block cursor-pointer ${isInWishlist(product?.id) ? 'text-red-700' : 'text-black'
                                            }`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
