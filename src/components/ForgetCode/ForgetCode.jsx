import React, { useState } from 'react'
import style from './ForgetCode.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import { Helmet } from 'react-helmet';
export default function ForgetCode() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    let navigate = useNavigate();
    async function reseteCode({resetCode}) {
        try {
            setIsLoading(true);
            let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
                {
                    resetCode
                }
            );
            console.log(data);
            setIsLoading(false);
            navigate('/resetepassword');
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            setApiError(data.message)
        }
    }

    let validationSchema = yup.object().shape({
        resetCode: yup.string().required('Please enter your code'),
    })

    let formik = useFormik({
        initialValues: {
            resetCode: ''
        },
        validationSchema,
        onSubmit: reseteCode
    })

    return (
        <>
            <Helmet>
                <title>Forget Code</title>
            </Helmet>
            <div className='container mx-auto w-3/4'>
                <h2 className='text-center text-3xl text-green-700 font-semibold my-10'>Resete Your Account Password</h2>
                {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    {apiError}
                    console.log(apiError)
                    
                </div> : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />


                        <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the Code :</label>
                    </div>

                    {formik.errors.resetCode && formik.touched.resetCode ? <div>
                        <p className="bg-red-200 text-red-500 text-sm py-1 px-2 rounded-lg my-5">{formik.errors.resetCode}</p>
                    </div> : null}

                    <div className='relative mb-20'>
                        <button type="submit"
                            className={`absolute right-0 ${formik.isValid && formik.touched.resetCode ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center' : 'text-slate-900 bg-white focus:ring-2 focus:outline-none focus:ring-slate-900 font-medium rounded-lg border-2 border-slate-900 text-sm w-auto px-5 py-2.5 text-center'}`}>
                            {isLoading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
