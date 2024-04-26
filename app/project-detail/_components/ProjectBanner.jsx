import Image from 'next/image'
import React from 'react'

const ProjectBanner = ({product}) => {
  return (
    <div>
    { product? <Image src={product?.attributes?.banner?.data?.attributes?.url} alt='banner' width={350} height={400} className='rounded-lg object-cover'/>
       :<div className="h-[350px] w-[350px] bg-slate-200 animate-pulse"></div>
    }
    </div>
  )
}

export default ProjectBanner