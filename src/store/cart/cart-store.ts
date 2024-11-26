import type{ CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface State {
  cart: CartProduct[],
  getTotalItems: () => number;
  getSummanryInformarion: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
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
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item ) => {
          if(item.id === product.id && item.size === product.size){
            return {...item, quantity};
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);
        set({ cart: updatedCartProducts });
      },
      getSummanryInformarion: () => {
        const { cart } = get();
        const subTotal = cart.reduce((subTotal, item) => subTotal + (item.quantity * item.price), 0);
        const tax = subTotal * 0.19;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
        return {
          subTotal,
          tax,
          total,
          itemsInCart
        };
      },
    }), {
      name: 'shopping-cart',
    }
  )
);