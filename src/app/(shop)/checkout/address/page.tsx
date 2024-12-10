import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountry, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

  const countries = await getCountry();
  const session = await auth();

  if ( !session?.user ) {
    return <h3>No hay sesión</h3>;
  }

  const userAddres = await getUserAddress( session.user.id );

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm countries={ countries } userStoredAddress={ userAddres! } />

      </div>

    </div>
  );
}