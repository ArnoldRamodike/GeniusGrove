'use client'

import Breadcrumb from '@/app/_components/Breadcrumb';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import ProjectBanner from '../_components/ProjectBanner';
import ProjectInfo from '../_components/ProjectInfo';
import ProductList from '@/app/_components/ProductList';
import { usePathname } from 'next/navigation';

const ProjectDetails = ({params}) => {
    const [productDetail, setProductDetail] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const path = usePathname();

    useEffect(() => {
      getProductById_();
    }, [])
    

    const getProductById_ = () => {
        GlobalApi.getProductById(params?.projectId).then(res => {
           setProductDetail(res.data.data);
           getProductListByCategory(res.data.data)
        })
    }

    const getProductListByCategory= (product) => {
        GlobalApi.getProductByCategory(product?.attributes?.product_cat?.data?.attributes?.Name).then(res => {
           setProductCategory(res.data.data);
           
        })
    }
  return (
    
    <div className='p-5 py-12 px-10 md:px-28'>
        <Breadcrumb path={path}/>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 sm:flex-row gap-5 sm:gap-10 ">
            <ProjectBanner product={productDetail}/>
            <ProjectInfo product={productDetail}/>
        </div>
        {productCategory.length >0 && <div className="mt-20">
            <h2 className='text-[20px] font-bold'>Related Products</h2>
            <ProductList productList={productCategory}/>
        </div>}
       
    </div>
  )
}

export default ProjectDetails