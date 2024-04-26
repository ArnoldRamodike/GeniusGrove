import { ShoppingCart } from 'lucide-react';
import React from 'react'

const ProjectInfo = ({product}) => {
  return (
    <div>
     {product?   
        (<div>
            <h2 className="text-[20px]">{product?.attributes?.title}</h2>
            <h2 className="text-[15px] text-gray-400">{product?.attributes?.product_cat?.data?.attributes?.Name}</h2>
            <h2 className="text-[12px] mt-5 text-gray-700">{product?.attributes?.description}</h2>
            <h2 className="text-[35px] font-medium mt-5 text-primary">${product?.attributes?.pricing}</h2>
            <button className='flex gap-2 p-3 bg-primary text-white rounded-lg px-10 mt-5 hover:bg-blue-700'><ShoppingCart/> Add to Cart</button>
        </div>)
        :( <div>
               <div className="h-[20px] w-[300px] bg-slate-200 animate-pulse"></div>
               <div className="h-[20px] w-[100px] bg-slate-200 animate-pulse"></div>
               <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></div>
               <div className="h-[20px] w-[100px] bg-slate-200 animate-pulse"></div> 
         </div>)
    }
    </div>
  )
}

export default ProjectInfo