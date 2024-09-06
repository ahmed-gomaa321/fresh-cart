import React, { useEffect } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div>
                <MainSlider />
                <CategoriesSlider />
                <Products />

            </div>
        </>
    )
}
