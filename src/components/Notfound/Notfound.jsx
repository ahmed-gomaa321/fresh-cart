import React from 'react'
import style from './Notfound.module.css'
import notfoundImg from '../../assets/images/404.png'
import { Helmet } from 'react-helmet'
export default function Notfound() {
    return (
        <>
        <Helmet>
            <title>Notfound</title>
        </Helmet>
            <div className='w-3/4 flex justify-center items-center mx-auto'>
                <img src={notfoundImg} className='w-full' alt="notfound" />
            </div>
        </>
    )
}
