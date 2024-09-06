import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getAllBrands() {
        try {
            setIsLoading(true)
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
            setBrands(data.data);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, []);


    return (
        <>
        <Helmet>
            <title>Brands</title>
        </Helmet>
            <div className={`${isLoading ? 'visible' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60`}>
                <Loader />
            </div>
            <h2 className='text-center text-4xl text-green-700 font-semibold py-8'>All Brands</h2>
            <div className='container flex flex-wrap items-center  my-10'>
                {brands.map((product) =>
                    <>
                        <div className='w-full lg:w-1/4'>
                            <div className='px-4 py-8 product transition-all duration-500 rounded-md'>
                                <div>
                                    <img className='w-full' src={product?.image} alt={product?.name} />
                                </div>
                                <p className='text-center'>{product?.name}</p>
                            </div>
                        </div>
                    </>)}
            </div>
        </>
    )
}
