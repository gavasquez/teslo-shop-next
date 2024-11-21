export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
/* import { initialData } from '@/seed/seed'; */
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';
/* import { notFound } from 'next/navigation'; */

interface Props {
  params: Promise<{ gender: string }>; 
  searchParams: Promise<{ page?: string }>;
}
/* const seedProducts = initialData.products; */


export default async function GenderByPage( { params, searchParams }: Props ) {

  const  { gender } = await params;  
  const  { page: pageSearchParams } = await searchParams;  

  const page = pageSearchParams ? parseInt( pageSearchParams ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages( { page, gender: gender as Gender } );

  if ( products.length === 0 ) {
    redirect(  `/gender/${ gender }` );
  }


  const label: Record<string, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para todos',
  };

  /* if ( id === 'kid' ) {
    notFound();
  } */

  return (
    <>
      <Title title={ `Articulos ${ label[gender] }` } subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </>
  );
}