import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import Link from 'next/link';

const Cart = () => {
    const {cart, setCart} = useContext(CartContext);
    console.log(cart);
  return (
    <div className='h-[300px] w-[250px] bg-gray-100 z-10 rounded-md shadow-sm border absolute mx-10 right-10 top-12 p-5 overflow-auto'>
          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
                {cart.map((product, index) => (
            <li className="flex items-center gap-4" key={index}>
                <img
                src={product?.attributes?.banner?.data?.attributes?.url}
                alt="Cart Product"
                className="size-16 rounded object-cover"
                />

                <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">{product?.attributes?.title}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                    {/* <dt className="inline">{product?.attributes?.product_cat}:</dt> */}
            
                    </div>

                    <div>
                    <dt className="inline">${product?.attributes?.pricing}</dt>

                    </div>
                </dl>
                </div>
            </li>
             ))}
            </ul>
            </div>

            <div className="space-y-4 text-center mt-5">
            <Link
                href={'/cart'}
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
            View my cart ({cart?.length})
            </Link>

            <Link
                href={'/'}
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
                Continue shopping
            </Link>
            </div>
    </div>
  )
}

export default Cart