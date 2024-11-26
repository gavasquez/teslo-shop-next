'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

  const [ loaded, setLoaded ] = useState<boolean>( false );
  const productsInCart = useCartStore( state => state.cart );
  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
  const removeProductCart = useCartStore( state => state.removeProduct );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) return <p>Loading...</p>;

  return (
    <>
      {
        productsInCart.map( product => (
          <div key={ `${ product.slug }-${ product.size }` } className="flex mb-5">
            <Image src={ `/products/${ product.image }` } width={ 100 } height={ 100 } alt={ product.title } className="mr-5 rounded" />
            <div>
              <Link className="hover:underline cursor-pointer" href={ `/product/${ product.slug }` }>
                { product.size } - { product.title }
              </Link>
              <p>${ product.price }</p>
              <QuantitySelector
                quantity={ product.quantity }
                onQuantityChanged={ ( quantity ) => updateProductQuantity( product, quantity ) } />
              <button className="underline mt-3" onClick={ () => removeProductCart( product ) }>
                Remover
              </button>
            </div>
          </div>
        ) )
      }
    </>
  );
};