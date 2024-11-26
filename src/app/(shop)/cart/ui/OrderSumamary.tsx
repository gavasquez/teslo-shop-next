'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const OrderSumamary = () => {

  const [ loaded, setLoaded ] = useState<boolean>( false );
  const { subTotal, tax, total, itemsInCart } = useCartStore( state => state.getSummanryInformarion() );

  useEffect( () => {
    setLoaded( true );
  }, [] );


  if ( !loaded ) return <p>Loading...</p>;


  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{ itemsInCart === 1 ? '1 articulo' : `${ itemsInCart } articulos` }</span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormat( subTotal ) }</span>

      <span>Impuestos (19%)</span>
      <span className="text-right">{ currencyFormat( tax ) }</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="mt-5 text-2xl text-right">{ currencyFormat( total ) }</span>
    </div>
  );
};