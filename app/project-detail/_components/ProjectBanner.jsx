import Image from 'next/image'
import React from 'react'

const ProjectBanner = ({product}) => {
  return (
    <div>
        <Image src={product?.attributes?.banner?.data?.attributes?.url} alt='banner' width={350} height={400} className='rounded-lg object-cover'/>
    </div>
  )
}

export default ProjectBanner