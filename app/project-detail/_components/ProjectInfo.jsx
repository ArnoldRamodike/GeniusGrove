import { CartContext } from '@/app/_context/CartContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const ProjectInfo = ({product}) => {

    const {user} = useUser();
    const router = useRouter();
    const {cart, setCart} = useContext(CartContext);
    const onAddToCartClick=() => {
        if (!user) {
            router.push('/sing-in');
            return;
        }else {
            const data = {
                data: {
                    userName: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    product: product?.id,
                }
            }
            GlobalApi.addToCart(data).then(res => {
                console.log(res, "Added to cart");
                setCart(cart=>[...cart,
                    {
                        id: res?.data?.id,
                        product: product
                    }
                    ]);
            },(error) => {
                console.log('Error', error);
            })
        }
    }
  return (
    <div>
     {product?   
        (<div>
            <h2 className="text-[20px]">{product?.attributes?.title}</h2>
            <h2 className="text-[15px] text-gray-400">{product?.attributes?.product_cat?.data?.attributes?.Name}</h2>
            <h2 className="text-[12px] mt-5 text-gray-700">{product?.attributes?.description}</h2>
            <h2 className="text-[35px] font-medium mt-5 text-primary">${product?.attributes?.pricing}</h2>
            <button className='flex gap-2 p-3 bg-primary text-white rounded-lg px-10 mt-5 hover:bg-blue-700'
                onClick={() => onAddToCartClick()}>
                <ShoppingCart/>
                 Add to Cart
            </button>
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