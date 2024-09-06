import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import Slider from "react-slick";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
export default function Categories() {
    const [categoriesData, setCategoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function getAllCategories() {
        try {
            setIsLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            console.log(data.data);
            setCategoriesData(data.data)
            setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllCategories()
    }, []);
    return (
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>
            <div className={`${isLoading ? 'visible' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60`}>
                <Loader />
            </div>
            <div className='container w-11/12'>
                <div className='flex flex-wrap py-8 items-center px-4 justify-center lg:justify-start'>
                    {categoriesData.map((category) =>
                        <div key={category._id} className='w-7/8 lg:w-1/3 px-6 py-6'>
                            <div className='product rounded-md overflow-hidden border-2 border-gray-300'>
                                <img className='w-[450px] h-[270px] lg:w-[100%] rounded-t-md lg:h-[280px] scale-125' src={category?.image} alt={category?.name} />
                                <div className='pt-10'>
                                    <h3 className='px-5 text-green-700 text-center py-4'>{category?.name}</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
