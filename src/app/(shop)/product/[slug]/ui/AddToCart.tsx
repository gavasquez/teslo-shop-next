'use client';
import { QuantitySelector, SizeSelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { use, useState } from 'react';


interface Props {
  product: Product;
}

export const AddToCart = ( { product }: Props ) => {

  const addProductToCart = useCartStore( state => state.addProductToCart );
  const [ size, setSize ] = useState<Size | undefined>();
  const [ quantity, setQuantity ] = useState<number>( 5 );
  const [ posted, setPosted ] = useState<boolean>( false );


  const addToCart = () => {
    setPosted( true );
    if ( !size ) return;
    console.log( { size, quantity, product } );
    // Todo: add To Cart
    const cartProduct: CartProduct = {
      id: product.id!,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[ 0 ]
    };
    addProductToCart( cartProduct );
    setPosted( false );
    setQuantity(1);
    setSize(undefined);
  };


  return (
    <>
      {/* Selector de Tallas */ }

      {
        posted && !size && ( <span className="mt-2 text-red-500">debe de seleccionar una talla*</span> )
      }

      <SizeSelector selectdSize={ size } availableSizes={ product.sizes } onSizesChange={ setSize } />
      {/* Selector de Cantidad */ }
      <QuantitySelector quantity={ quantity } onQuantityChanged={ setQuantity } />

      {/* Boton de Comprar */ }
      <button className="btn-primary my-5" onClick={ addToCart }>
        Agregar al carrito
      </button>
    </>
  );
};