'use client'

import Breadcrumb from '@/app/_components/Breadcrumb';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import ProjectBanner from '../_components/ProjectBanner';
import ProjectInfo from '../_components/ProjectInfo';
import ProductList from '@/app/_components/ProductList';

const ProjectDetails = ({params}) => {
    const [productDetail, setProductDetail] = useState([]);

    useEffect(() => {
      getProductById_();
    }, [])
    

    const getProductById_ = () => {
        GlobalApi.getProductById(1).then(res => {
           setProductDetail(res.data.data);
        })
    }

    const getProductListByCategory= () => {

    }
  return (
    
    <div className='p-5 py-12 px-10 md:px-28'>
        <Breadcrumb/>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 sm:flex-row gap-5 sm:gap-10 ">
            <ProjectBanner product={productDetail}/>
            <ProjectInfo product={productDetail}/>
        </div>
        <ProductList productList={getProductListByCategory(productDetail)}/>
    </div>
  )
}

export default ProjectDetails