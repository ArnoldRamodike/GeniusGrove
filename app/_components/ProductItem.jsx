
import { ArrowRightSquare } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const ProductItem = ({product}) => {

  return (
    <Link href={'/project-detail/'+ product?.id}>
        <div className="hover:border p-1 rounded-lg border-blue-300">
            <Image src={product?.attributes?.banner?.data?.attributes?.url} alt='Product' width={400} height={350} className='rounded-t-lg h-[190px] object-cover'/>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-b-lg">
            <div>
                <h2 className='text-[14px] font-medium line-clamp-1'>{product?.attributes?.title}</h2>
                <h2 className='text-[12px] text-gray-400 font-medium flex gap-2'><ArrowRightSquare className='h4 w-4'/> {product?.attributes?.category}</h2>
            </div>
            <h2 className='font-bold'>${product?.attributes?.pricing}</h2>
        </div>
    </Link>
  )
}

export default ProductItem