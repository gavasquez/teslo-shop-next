'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
/* import { useRouter } from 'next/navigation'; */
import { useActionState, useEffect } from 'react';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {

 /*  const router = useRouter(); */

  const [ errorMessage, formAction, isPending ] = useActionState(
    authenticate,
    undefined,
  );


  useEffect(() => {

    if(errorMessage === 'Success') {
       /* router.replace('/'); */
       window.location.replace('/'); // Hace el refresh de la pagina
    }
    
  }, [ errorMessage ]);

  return (
    <form action={ formAction } className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email" name="email" placeholder="correo@ejemplo.com" />


      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" name="password" placeholder="******" />

      { errorMessage === 'InvalidCredentials' && (
        <div className="flex flex-row mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales no son correctas</p>
        </div>
      ) }

      <button
        type="submit"
        className={
          clsx( {
            "btn-primary": !isPending,
            "btn-disabled": isPending
          } )
        }
        disabled={ isPending }>
        Ingresar
      </button>


      {/* divisor line */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  );
};