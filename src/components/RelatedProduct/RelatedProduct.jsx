import React from 'react'
import style from './RelatedProduct.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
export default function RelatedProduct() {
    const [relatedProduct, setRelatedProduct] = useState([]);

    let { category } = useParams()

    async function getRelatedProduct() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            let allProduct = data.data;
            let relatedProduct = allProduct.filter((product) => product.category.name == category);
            setRelatedProduct(relatedProduct);
            console.log(relatedProduct);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRelatedProduct()
    }, []);

    return (
        <div className='container lg:flex flex-wrap items-center'>
            {relatedProduct.map((product, index) =>
                <div key={index} className='w-full lg:w-1/5 px-3 py-3'>
                    <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                        <img className='w-full' src={product?.imageCover} />
                        <h3 className='text-lg text-center'>{product?.category?.name}</h3>
                    </Link>
                </div>)}
        </div>
    )
}
