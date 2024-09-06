import React from 'react'
import style from './AllOrders.module.css'
import { Helmet } from 'react-helmet'
export default function AllOrders() {
    return (
        <div>
            <Helmet>
                <title>All Orders</title>
            </Helmet>
            <h2 className='text-center text-2xl'>AllOrders</h2>
        </div>
    )
}
