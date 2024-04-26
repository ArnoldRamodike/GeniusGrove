'use client'

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import GlobalApi from '../_utils/GlobalApi'

const ProductSection = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {

        getProducts();

    }, [])
    
    const getProducts = () => {
        GlobalApi.getLatestProducts().then(res => {
            setProducts(res.data.data)
        })
    }

  return products&&(
    <div className='px-10 md:px-20 '>
        <h2 className='font-medium mx-3 text-[20px]'>Latest Courses</h2>
        <ProductList productList={products}/>
    </div>
  )
}

export default ProductSection