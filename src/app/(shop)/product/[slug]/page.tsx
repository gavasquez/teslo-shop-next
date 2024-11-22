export const revalidate = 604800; // 7 dias

import { getProdcutBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from '@/components';
import { titleFont } from '@/config/font';
/* import { initialData } from '@/seed/seed'; */
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{slug: string}>;
}

export default async function ProductPage( { params }: Props ) {

  const { slug } =await params;

  const product = await getProdcutBySlug(slug);

  console.log({product});

  if ( !product ) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2">
        {/* Moblie */}
        <ProductMobileSlideShow title={product.title}  images={product.images} className="block md:hidden"/>

        {/* Desktop */}
        <ProductSlideShow title={ product.title } images={ product.images } className="hidden md:block"/>
      </div>
      {/* Detalles */ }
      <div className="col-span-1 px-5">
        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>{ product.title }</h1>
        <p className="text-lg mb-5">{ product.price }</p>

        {/* Selector de Tallas */ }
        <SizeSelector selectdSize={ product.sizes[ 3 ] } availableSizes={ product.sizes } />
        {/* Selector de Cantidad */ }
        <QuantitySelector quantity={ 5 } />

        {/* Boton de Comprar */ }
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>
        {/* Descripcion */ }
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>
      </div>
    </div>
  );
}