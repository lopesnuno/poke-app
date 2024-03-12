import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import PokemonSearch from '~/components/PokemonSearch';
import { json } from '@remix-run/react';
import { ChangeEvent, useState } from 'react';

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
    // This should return an error
    return json({});
  }

  return redirect(`/${pokemonName}`);
};

export default function Index() {
  const [name, setName] = useState<string>();

  function handleOnChange(v: ChangeEvent<HTMLInputElement>) {
    setName(v.target.value.toLowerCase());
  }

  return (
    <form method='post' action='/?index'>
      <PokemonSearch />
      <div>
        <input type='text' name='name' onChange={handleOnChange} />
        {name && name.length !== 0 && (
          <button type='submit' name='search'>search</button>
        )}
      </div>
    </form>
  );
}
