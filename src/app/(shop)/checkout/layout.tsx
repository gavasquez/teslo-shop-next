import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function CheckoutLayout( {
  children
}: {
  children: React.ReactNode;
} ) {

  const session = await auth();

  // Si no tengo una sesión, redirijo a la página de login
  if ( !session?.user ) {
    redirect( '/auth/login' );
  }

  return (
    <>
      { children }
    </>
  );
}