import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
export default function Navbar() {

    let navigate = useNavigate()
    let { cart } = useContext(CartContext);
    let { userLogin, setUserLogin } = useContext(UserContext);
    let { wishlist } = useContext(wishlistContext);

    const [isOpen, setisOpen] = useState(false);

    function logout() {
        localStorage.removeItem("userToken");
        setUserLogin(null);
        navigate("/login")
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <nav className='bg-gray-200 py-4 text-center fixed top-0 inset-x-0 z-50 text-slate-500'>
                <div className='container px-3 flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-2 relative'>
                    <div className='cursor-pointer lg:hidden absolute right-5 flex justify-center items-center border-2 px-2 border-slate-900 rounded-md' onClick={() => setisOpen(!isOpen)}>
                        <i className='fas fa-bars text-xl font-bold'></i>
                    </div>
                    <div className='flex flex-col lg:flex-row space-x-2'>
                        <img src={logo} width={120} alt="fresh cart logo" />
                        <ul className={`lg:flex lg:items-center text-start flex-col lg:flex-row ${isOpen ? 'visible' : 'hidden'}`}>
                            {userLogin !== null ?
                                <>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='home'>Home</NavLink></li>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='cart'>Cart</NavLink></li>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='wishlist'>Wish List</NavLink></li>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='products'>Products</NavLink></li>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='brands'>Brands</NavLink></li>
                                    <li className='py-1 mx-2'><NavLink className='text-slate-600 font-light text-lg' to='categories'>Categories</NavLink></li>
                                </>
                                :
                                null
                            }
                        </ul>
                    </div>
                    <div className={`lg:flex flex-col lg:flex-row lg:space-x-2 lg:items-center w-fit ${isOpen ? 'visible' : 'hidden'}`}>
                        <ul className='flex items-start lg:items-center flex-col lg:flex-row lg:space-x-2 pl-3'>
                            {userLogin !== null ? <li className='lg:mr-4 lg:static absolute bottom-1 right-7 '>
                                <Link to='/cart'>
                                    <span className='fas fa-cart-shopping cursor-pointer text-gray-600 text-2xl relative'>
                                        <span className='px-2 py-0 rounded-md bg-green-600 text-white absolute -top-2 left-1/3 text-sm font-light'>{cart?.numOfCartItems}</span>
                                    </span>
                                </Link>
                                <Link className='mx-4' to='/wishlist'>
                                    <span className='fas fa-heart cursor-pointer text-gray-600 text-2xl relative'>
                                        <span className='px-2 py-0 rounded-md bg-green-600 text-white absolute -top-2 left-1/3 text-sm font-light'>{wishlist?.count}</span>
                                    </span>
                                </Link>
                            </li>
                                :
                                null}

                            <li className='py-1 flex gap-2'>
                                <i className='cursor-pointer text-slate-900 fab fa-facebook-f'></i>
                                <i className='cursor-pointer text-slate-900 fab fa-twitter'></i>
                                <i className='cursor-pointer text-slate-900 fab fa-linkedin-in'></i>
                                <i className='cursor-pointer text-slate-900 fab fa-instagram'></i>
                                <i className='cursor-pointer text-slate-900 fab fa-youtube'></i>
                            </li>
                            {userLogin !== null ?
                                <>
                                    <li onClick={logout} className='py-1'><span className='text-slate-600 cursor-pointer'>Logout</span></li>
                                </>
                                :
                                <>
                                    <li className='py-1'><NavLink className='text-slate-600 font-light text-lg' to='login'>Login</NavLink></li>
                                    <li className='py-1'><NavLink className='text-slate-600 font-light text-lg' to='/register'>Register</NavLink></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
