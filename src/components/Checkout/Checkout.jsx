import React, { useContext } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
export default function Checkout() {

    let { handleCheckout, isLoading } = useContext(CartContext)

    let validationSchema = yup.object().shape({
        details: yup.string().required('details is required'),
        phone: yup.string().trim().matches(/^(\+20 ?1|01|00201)[0125][0-9]{8}/, 'must be egyptian number').required('phone is required'),
        city: yup.string().required('city is required'),
    })

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        validationSchema,
        onSubmit: handleCheckout,
    })
    return (
        <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div className='container w-10/12 lg:w-8/12 py-4'>
                <h2 className='text-3xl font-bold mb-6 text-green-600'>Checkout Now</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Adress Details :</label>
                    </div>

                    {formik.errors.details && formik.touched.details ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.details}
                        </div> :
                        null
                    }

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number :</label>
                    </div>

                    {formik.errors.phone && formik.touched.phone ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.phone}
                        </div> :
                        null
                    }

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City :</label>
                    </div>

                    {formik.errors.city && formik.touched.city ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.city}
                        </div> :
                        null
                    }

                    <div className='relative mb-20'>
                        <button type="submit" className={`absolute right-0 ${formik.isValid && formik.touched.details && formik.touched.phone && formik.touched.city ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center' : 'text-slate-900 bg-white focus:ring-2 focus:outline-none focus:ring-slate-900 font-medium rounded-lg border-2 border-slate-900 text-sm w-auto px-5 py-2.5 text-center'}`}>
                            {isLoading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Pay now'}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
