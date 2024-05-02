'use client'

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import GlobalApi from '../_utils/GlobalApi'
import { ArrowRight } from 'lucide-react'

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

    const filterProductList= (category) => {
        const result = products.filter((item, i) =>  
        item?.attributes?.product_cat?.data?.attributes?.Name == category);
 
        return result
    }

  return products&&(
    <div className='px-10 md:px-20 '>
        <h2 className='font-normal mx-3 text-[20px]'>Latest Courses</h2>
        <span className='font-normal text-[14px] float-right cursor-pointer flex items-center'> View All Courses <ArrowRight/></span>
        <ProductList productList={products}/>

        <h2 className='font-medium mx-3 text-[20px]'>Media Courses</h2>
        <span className='font-normal text-[14px] float-right cursor-pointer flex items-center'> View All Courses <ArrowRight/></span>
        <ProductList productList={filterProductList('Media')}/>
    </div>
  )
}

export default ProductSection