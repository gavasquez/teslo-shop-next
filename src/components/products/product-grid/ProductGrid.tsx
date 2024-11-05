import { Product } from '@/interfaces';
import { ProductGriItem } from './ProductGriItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ( { products }: Props ) => {
  return (
    <div className="grid grid-col-2 sm:grid-cols-3 gap-10 mb-10">
      {
        products.map( ( product ) => (
          <ProductGriItem product={ product } key={ product.slug } />
        ) )
      }
    </div>
  );
};