import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Register() {
    let { setUserLogin } = useContext(UserContext);
    // make use state to show error if there is
    const [apiError, setApiError] = useState(null);
    // make loader when click submit
    const [loading, setLoading] = useState(false);

    // make navigate hook to programating routing
    let navigate = useNavigate();

    // post values to back end and (open , close)=> loading and show error to user 
    async function handleRegister(values) {
        setApiError(null)
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            console.log(data);
            localStorage.setItem("userToken", data.token);
            setUserLogin(data.token)
            navigate('/home')
        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }

    }

    // make validation with yup
    let validationSchema = yup.object().shape({
        name: yup.string().min(3, 'minlength is 3').max(15, 'maxlength is 10').required('name is required'),
        email: yup.string().email('invalid email').required('email is required'),
        phone: yup.string().trim().matches(/^(\+20 ?1|01|00201)[0125][0-9]{8}/, 'must be egyption number').required('phone is required'),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            , 'Minimum eight characters, at least one letter, one number and one special character:').required('password is required'),
        rePassword: yup.string().oneOf([yup.ref('password')], 'password and repassword not match').required('repassword is required'),
    })

    // make formik hook to handle form data and validation
    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema,
        onSubmit: handleRegister,
    })

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className='container w-10/12 lg:w-8/12 py-4'>
                <h2 className='text-3xl font-bold mb-6 text-green-600'>Register Now</h2>
                {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    {apiError}
                </div> : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
                    </div>

                    {formik.errors.name && formik.touched.name ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.name}
                    </div> : null}

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Adress :</label>
                    </div>

                    {formik.errors.email && formik.touched.email ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.email}
                        </div> :
                        null}

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-slate-900 caret-green-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password :</label>
                    </div>

                    {formik.errors.password && formik.touched.password ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.password}
                    </div> : null}

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm caret-green-600 text-slate-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your repassword :</label>
                    </div>

                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.rePassword}
                    </div> : null}

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone number :</label>
                    </div>

                    {formik.errors.phone && formik.touched.phone ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.phone}
                    </div> : null}

                    <div className='relative mb-20'>
                        <button type="submit" className={`absolute right-0 ${formik.isValid && formik.touched.name && formik.touched.email && formik.touched.password && formik.touched.rePassword && formik.touched.phone ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center' : 'text-slate-900 bg-white focus:ring-2 focus:outline-none focus:ring-slate-900 font-medium rounded-lg border-2 border-slate-900 text-sm w-auto px-5 py-2.5 text-center'}`}>
                            {loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Register Now'}
                        </button>
                    </div>

                </form>
            </div>

        </>
    )
}
