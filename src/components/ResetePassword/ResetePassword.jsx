import React, { useContext, useState } from 'react'
import style from './ResetePassword.module.css'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
export default function ResetePassword() {
    const [isLoading, setIsLoading] = useState(false);
    let { setUserLogin } = useContext(UserContext);
    let navigate = useNavigate();

    async function resetepassword(values) {
        try {
            setIsLoading(true);
            let data = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
            localStorage.setItem("userToken", data.token);
            setUserLogin(data.token);
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            setIsLoading(false)
            console.log(err);
        }

    }

    let validationSchema = yup.object().shape({
        email: yup.string().email('invalid email').required('email is required'),
        newPassword: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            , 'Minimum eight characters, at least one letter, one number and one special character:').required('password is required')
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema,
        onSubmit: resetepassword
    })
    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className='container mx-auto w-3/4'>
                <h2 className='text-center text-3xl text-green-700 font-semibold my-10'>Resete Your Account Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
                    </div>

                    {formik.errors.email && formik.touched.email ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.email}
                        </div> :
                        null}

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />


                        <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password :</label>
                    </div>

                    {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.newPassword}
                    </div> : null}

                    <div className='relative mb-20'>
                        <button type="submit" className={`absolute right-0 ${formik.isValid && formik.touched.email && formik.touched.newPassword ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center' : 'text-slate-900 bg-white focus:ring-2 focus:outline-none focus:ring-slate-900 font-medium rounded-lg border-2 border-slate-900 text-sm w-auto px-5 py-2.5 text-center'}`}>
                            {isLoading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Resete'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
