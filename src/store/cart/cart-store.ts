import type{ CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface State {
  cart: CartProduct[],
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //* 1. Revisar si el producto ya existe con la talla seleccionada
        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        );
        if(!productInCart){
          set({ cart: [ ...cart, product ] });
          return;
        }
        //* 2. Se que el producto existe por talla... tengo que incremnetar la cantidad
        const updatedCartProdcuts = cart.map((item ) => {
          if(item.id === product.id && item.size === product.size){
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });
        set({ cart: updatedCartProdcuts });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }), {
      name: 'shopping-cart',
    }
  )
);