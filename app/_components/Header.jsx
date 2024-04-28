'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import GlobalApi from '../_utils/GlobalApi'
import Cart from './Cart'

const Header = () => {
    const {user} = useUser();
    const [isLogin, setIsLogin] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const {cart, setCart} = useContext(CartContext);

    useEffect(() => {
      setIsLogin(window.location.href.toString().includes('sign-in'));
    }, []);

    useEffect(() => {
        setIsLogin(window.location.href.toString().includes('sign-up'));
        getCartItems();
      
      }, [user]);

      useEffect(() => {
        setOpenCart(true);
      }, [cart]);

    const getCartItems = () => {
        GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(res => {
            const result = res.data.data;
            result&& result.forEach(prd => {
                 setCart(cart => [...cart,
                    {
                        id: prd.id,
                        product: prd.attributes?.product?.data
                    }
                    ]);
                  
            });
        //    cart && console.log(cart);
          return result;
        })
      }
  return !isLogin&& (
    <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl shadow-sm items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Link className="block text-teal-600" href={'/'}>
            <span className="sr-only">Home</span>
            <Image src={'/logo.svg'} alt='logo' width={80} height={100}/>
            </Link>

            <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/'}> Home </Link>
                </li>

                <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/projects'}> Explore </Link>
                </li>

                <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/projects'}> Projects </Link>
                </li>

                <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/contact'}> Contact Us </Link>
                </li>

                <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/about-us'}> About Us </Link>
                </li>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user? <div className="sm:flex sm:gap-4">
                <Link
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-tertiary"
                    href={"/sign-in"}
                >
                    Login
                </Link>

                <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium transition hover:text-primary sm:block"
                    href={"/sign-up"}
                >
                    Register
                </Link>
                </div>
                     : 
                     <div className='flex items-center gap-5'>
                        <UserButton/>
                        <h2 className='flex gap-1 cursor-pointer' onClick={() => setOpenCart(!openCart)}> 
                          <ShoppingCart className='text-red-500 '/>({cart?.length})
                        </h2>
                    </div>}
                    {openCart && <Cart/>}
                <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                >
                <span className="sr-only">Toggle menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header