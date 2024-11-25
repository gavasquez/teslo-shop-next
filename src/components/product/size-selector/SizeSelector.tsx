'use client';
import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectdSize?: Size;
  availableSizes: Size[];
  onSizesChange: (size: Size) => void;
}

export const SizeSelector = ({  selectdSize, availableSizes, onSizesChange }: Props) => {
  return (
   <div className="my-5">
    <h3 className="font-bold mb-4">Tallas disponibles</h3>

    <div className="flex">
      {
        availableSizes.map( size => (
          <button key={ size } 
          onClick={() => onSizesChange(size) }
          className={
            clsx("mx-2 hover:underline text-lg", {
              'underline': size === selectdSize
            })
          }>
            { size }
          </button>
        ) )
      }
    </div>
   </div>
  )
}