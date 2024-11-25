export const revalidate = 604800; // 7 dias
import type { Metadata } from 'next'
import { getProdcutBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { titleFont } from '@/config/font';
import { ResolvingMetadata } from 'next';
/* import { initialData } from '@/seed/seed'; */
import { notFound } from 'next/navigation';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: Promise<{slug: string}>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;
 
  // fetch data
  const product = await getProdcutBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: (product?.title ?? 'Producto no encontrado') + '',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/porducts/${product?.images[1]}`],
      //images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function ProductPage( { params }: Props ) {

  const { slug } =await params;

  const product = await getProdcutBySlug(slug);

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
        <StockLabel slug={ product.slug } />
        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>{ product.title }</h1>
        <p className="text-lg mb-5">{ product.price }</p>

        <AddToCart product={ product } />
        
        {/* Descripcion */ }
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>
      </div>
    </div>
  );
}