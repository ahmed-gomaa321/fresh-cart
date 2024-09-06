import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';


export default function Login() {
    let { setUserLogin } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();

    async function handleLogin(values) {
        setApiError(null)
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
            localStorage.setItem("userToken", data?.token)
            setUserLogin(data?.token)
            console.log(data);
            navigate("/");
            window.location.reload()
        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email('invalid email').required('email is required'),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            , 'password pattern is inavalid').required('password is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin,
    })


    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='container w-10/12 lg:w-8/12 py-4'>
                <h2 className='text-3xl font-bold mb-6 text-green-600'>Login Now</h2>
                {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    {apiError}
                </div> : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent caret-green-600 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />


                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Adress :</label>
                    </div>

                    {formik.errors.email && formik.touched.email ?
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                            {formik.errors.email}
                        </div> :
                        null
                    }

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-slate-900 caret-green-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
                    </div>

                    {formik.errors.password && formik.touched.password ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {formik.errors.password}
                    </div> : null}

                    <div className="lg:flex lg:flex-row-reverse items-center justify-between">
                        <div className='mb-3'>
                            <button type="submit" className={`${formik.isValid && formik.touched.email && formik.touched.password ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center' : 'text-slate-900 bg-white focus:ring-2 focus:outline-none focus:ring-slate-900 font-medium rounded-lg border-2 border-slate-900 text-sm w-full lg:w-auto px-5 py-2.5 text-center'}`}>
                                {loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Login Now'}
                            </button>
                        </div>
                        <div>
                            <p className='text-md font-light mb-3 lg:mb-1'>don't have an account ? <Link className='font-bold text-green-700 text-lg' to={"/register"}>Register</Link></p>
                            <Link to="/forgetpassword"
                                className='font-bold hover:text-green-700 transition-all duration-500'>forgotten your password ?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
