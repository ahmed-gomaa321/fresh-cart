import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios, { all } from 'axios';

export default function CategoriesSlider() {
    const [categoriesData, setCategoriesData] = useState([]);

    async function getAllCategories() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategoriesData(data.data)
        } catch (err) {
            console.log(err);

            
        }
    }
    useEffect(() => {
        getAllCategories()
    }, []);

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            }
        ]
    };
    return (
        <>
            <div className="container">
                <h2 className='mb-3 text-gray-900 font-light text-xl'>Shop popular Categories</h2>
                <div>
                    <Slider {...settings}>
                        {categoriesData.map((category, index) =>
                            <div key={index}>
                                <img key={category._id} className='h-[220px] w-full' src={category?.image} alt={category._id} />
                                <h3 className='font-semibold'>{category.name}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        </>
    )
}
