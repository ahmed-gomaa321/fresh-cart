import React from 'react'
import style from './Footer.module.css'
import AmazonPay from '../../assets/images/AmazonPay.webp'
import AMERICAN from '../../assets/images/AMERICAN-EXPRESS.webp'
import mastercard from '../../assets/images/mastercard.png'
import PayPal from '../../assets/images/PayPal.svg.png'
export default function Footer() {
    return (
        <footer className='w-full bg-gray-200 mt-8'>
            <div className='container p-10'>
                <h2 className='text-2xl'>Get The FreshCart App</h2>
                <p className='text-slate-500 my-3'>we will send you a link, open it on your phone to download the app.</p>
                <div className="px-2 flex flex-wrap md:justify-between items-center">
                    <input type="text" className='sm:w-3/4 w-full placeholder:pl-2 p-2 rounded-lg focus:outline-gray-400' placeholder='Email ..' />
                    <button className='py-2 px-8 lg:mt-0 mt-3 bg-green-700 hover:bg-green-800 text-white rounded-lg'> Share App Link</button>
                </div>
                <div className='mt-8 border-y-2 border-gray-300 py-5 px-2 flex flex-wrap items-center justify-between'>
                    <div className='md:w-1/2 w-full flex flex-wrap items-center gap-2'>
                        <p>Payment Partners</p>
                        <div className='flex flex-wrap items-center gap-1'>
                            <img className='w-[50px]' src={AmazonPay} alt="amazon" />
                            <img className='w-[50px]' src={AMERICAN} alt="american" />
                            <img className='w-[50px]' src={mastercard} alt="mastercard" />
                            <img className='w-[50px]' src={PayPal} alt="paypal" />
                        </div>
                    </div>
                    <div className='md:w-1/2 w-full flex flex-wrap items-center'>
                        <p>Get deliveries with FreshCart</p>
                        <div className='flex items-center flex-wrap'>
                            <div  className='bg-black text-white rounded-lg relative mx-2'>
                                <i className='fab fa-apple w-full absolute left-1 top-1/2 -translate-y-1/2 text-2xl'></i>
                                <div className='px-3 pl-8'>
                                    <p className='text-[10px] text-gray-400'>avilable on the</p>
                                    <p>App store</p>
                                </div>
                            </div>
                            <div  className='bg-black text-white rounded-lg relative'>
                                <i className='fab fa-google-play w-full absolute left-1 top-1/2 -translate-y-1/2 text-2xl'></i>
                                <div className='px-3 pl-8'>
                                    <p className='text-[10px] text-gray-400'>Get it on</p>
                                    <p>Google Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
