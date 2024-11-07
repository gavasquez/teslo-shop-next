import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
/* import { notFound } from 'next/navigation'; */

interface Props {
  params: {
    id: Category;
  };
}
const seedProducts = initialData.products;


export default function CategoryPage( { params }: Props ) {
  const { id } = params;
  const products = seedProducts.filter( product => product.gender === id );

  const label: Record<Category, string> = {
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'para todos',
  };
  /* if ( id === 'kid' ) {
    notFound();
  } */

  return (
    <>
      <Title title={ `Articulos ${ label[id] }` } subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={ products } />
    </>
  );
}