import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/react';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useActionData } from 'react-router';
import Error from '~/components/Error';

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeAPP' },
    { name: 'Search all you favourite pokemons in one place', content: 'Welcome to PokeAPP!' }
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const pokemonName = formData.get('name') as string;

  if (!pokemonName || pokemonName?.length === 0) {
    return json({
      error: 'Please provide a name or an ID'
    });
  }

  return redirect(`/${pokemonName.toLowerCase()}`);
};

export default function Index() {
  const actionData = useActionData();

  return (
    <form method='post' action='/?index' className='flex flex-col gap-y-2 items-center'>
      <div className='flex flex-row gap-x-2 py-4'>
        <Input type='text' name='name' placeholder={'Type Pikachu'} />
        <Button type='submit' name='search'>Search</Button>
      </div>
      {actionData && actionData.error && (
        <Error message={actionData.error} />
      )}
    </form>
  );
}
