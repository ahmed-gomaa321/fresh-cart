import React, { useContext, useEffect } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
    let navigate = useNavigate();
    let { getCart, cart, setCart, updateProductCount, isLoading, removeProductCart, clearCart } = useContext(CartContext);

    useEffect(() => {
        getCart()
    }, []);
    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        {isLoading ? <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60">
            <Loader />
        </div> :
            cart?.numOfCartItems == 0 ? <h2 className='text-center font-semibold text-2xl'>Cart Is Empty...🧐</h2>
                : <>
                    <div className={`flex justify-center items-center z-30 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 ${isLoading ? "visible" : "hidden"}`}>
                        <Loader />
                    </div>
                    <div className="container relative w-3/4 shadow-md sm:rounded-lg mt-10 p-4 bg-gray-200">
                        <div className='flex flex-wrap justify-between items-center p-4'>
                            <p className='text-2xl font-semibold'>Cart Shop</p>
                            <Link to="/checkout" className='border-2 border-green-600 hover:bg-green-700 hover:text-white rounded-md px-6 py-3 font-semibold'>Check Out</Link>
                        </div>
                        <div className='flex flex-wrap justify-between items-center p-4'>
                            <p className='font-semibold text-lg text-slate-950'>Total Price : <span className='text-green-600 font-semibold'>{cart?.data?.totalCartPrice}</span> EGP</p>
                            <p className='font-semibold '>Total Number Of Items : <span className='text-green-600 font-semibold'>{cart?.numOfCartItems}</span></p>
                        </div>


                        <div className='px-4'>
                            {cart?.data?.products.map((product) =>
                                <div key={product?.product?.id} className='flex flex-wrap justify-between items-center border-b-2 border-gray-300 w-full py-4'>
                                    <div className='flex flex-wrap items-center md:w-3/4'>
                                        <div className='pr-4'>
                                            <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded-md" alt={product?.product?.title} />
                                        </div>
                                        <div className='font-semibold'>
                                            <p>{product?.product?.title}</p>
                                            <p className='pb-2'>{product?.price} <span className='text-green-600'>EGP</span></p>
                                            <div className='font-light'>
                                                <span onClick={() => removeProductCart(product?.product?.id)} className='text-red-600 cursor-pointer hover:text-red-700'>
                                                    <i className='fas fa-trash text-red-600 hover:text-red-700 pr-1'></i>
                                                    remove
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3 md:mt-0'>
                                        <span onClick={() => updateProductCount(product?.product?.id, product?.count + 1)}>
                                            <button className='px-4 py-1 border-2 border-green-500 hover:bg-green-700 hover:text-white rounded-md text-md font-semibold'>
                                                <i className='fas fa-plus font-bold text-md'></i>
                                            </button>
                                        </span>
                                        <span className='mx-2 font-bold '>{product?.count}</span>
                                        <span onClick={() => updateProductCount(product?.product?.id, product?.count - 1)}>
                                            <button className='px-4 py-1 border-2 border-green-500 hover:bg-green-700 hover:text-white rounded-md text-md font-semibold'>
                                                <i className='fas fa-minus font-bold text-md'></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className='flex justify-center items-center p-5'>
                                <button onClick={() => { clearCart(); setTimeout(() => navigate("/home"), 800) }} className='border-2 border-green-600 hover:bg-green-700 hover:text-white rounded-md px-6 py-3 text-lg font-light'>Clear Your Cart</button>
                            </div>
                        </div>
                    </div>
                </>
        }

    </>

}
