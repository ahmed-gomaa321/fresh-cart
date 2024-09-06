import React from 'react';
import style from './MainSlider.module.css';
import Slider from 'react-slick';
import mainSliderImg from '../../assets/images/slider-image-3.jpeg'
import blogImg from '../../assets/images/blog-img-2.jpeg'
import blog from '../../assets/images/slider-image-2.jpeg'
import SliderOne from '../../assets/images/slider-image-1.jpeg'
import banner from '../../assets/images/banner-4.jpeg'
export default function MainSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div className='container flex flex-wrap mb-6'>
            <div className='w-full md:w-3/4'>
                <Slider {...settings}>
                    <img src={mainSliderImg} className='h-[400px] w-full' />
                    <img src={blogImg} className='h-[400px] w-full' />
                    <img src={banner} className='h-[400px] w-full' />
                </Slider>
            </div>
            <div className="w-full md:w-1/4 flex md:block">
                <div className='h-[200px] w-1/2 md:w-auto'>
                    <img src={SliderOne} className='w-full h-full' />
                </div>
                <div className='h-[200px] w-1/2 md:w-auto'>
                    <img src={blog} className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}
