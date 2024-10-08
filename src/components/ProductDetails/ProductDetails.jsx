import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { Helmet } from 'react-helmet';
import { wishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    let { addProductToWishlist, currentIds, isLoader } = useContext(wishlistContext);
    let { addProductToCart, isLoading } = useContext(CartContext);
    let { id } = useParams();

    // slider variable
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };


    async function getProductDetails(id) {
        try {
            setLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            console.log(data.data);
            setProductDetails(data.data)
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    const isInWishlist = (productId) => {
        return currentIds.some((id) => id === productId)
    }



    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    return (
        <>
            <Helmet>
                <title>Product Details</title>
            </Helmet>
            <div className={`${loading || isLoader || isLoading ? 'visible' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-30`}>
                <Loader />
            </div>
            <div className='container lg:w-4/5 lg:flex justify-between items-center py-10'>
                <div className='lg:w-1/3'>
                    <div className='px-4 w-4/5 lg:w-full mx-auto mb-12'>
                        <Slider {...settings}>
                            {productDetails?.images.map((img) => <img key={productDetails?.id} src={img} loading='lazy' alt={productDetails?.title.split(' ').slice(0, 2).join(' ')} />
                            )}
                        </Slider>
                    </div>
                </div>
                <div className='lg:w-2/3'>
                    <div className='px-4'>
                        <h1 className='font-normal text-xl'>{productDetails?.title}</h1>
                        <p className='text-gray-500 my-3'>{productDetails?.description}</p>
                        <div className="flex justify-between items-center">
                            <span>{productDetails?.price} <span className='text-green-700'>EGP</span></span>
                            <span><i className='fas fa-star p-1 text-yellow-500'></i>{productDetails?.ratingsAverage}</span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <button onClick={() => addProductToCart(productDetails?.id)} className='lg:ml-10 text-center w-3/4 px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-800 bg my-3 block transition-all duration-500'>+ add to cart</button>
                            <i
                                onClick={() => addProductToWishlist(productDetails?.id)}
                                className={`fas fa-heart text-3xl block cursor-pointer ${isInWishlist(productDetails?.id) ? 'text-red-700' : 'text-black'
                                    }`}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedProduct />
        </>
    )
}
