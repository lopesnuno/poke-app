import { json } from '@remix-run/react';
import { useActionData, useLoaderData } from 'react-router';
import { ChangeEvent, useState } from 'react';
import PokemonCard from '~/components/PokemonCard';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { redirect } from '@remix-run/node';
import Error from '~/components/Error';

type Pokemon = {
  id: string, name: string, sprite: string
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionId = formData.get('action');

  if (actionId && actionId.length !== 0) {
    const pokemonId = formData.get('pokemon-id');

    return redirect(`/${actionId === 'next' ? Number(pokemonId) + 1 : Number(pokemonId) - 1}`);
  }

  const pokemonName = formData.get('name') as string;

  if (!pokemonName || pokemonName.length === 0) {
    return json({
      error: 'Please provide a name or an ID'
    });
  }

  return redirect(`/${pokemonName.toLowerCase()}`);
};


export const loader = async ({ params }) => {
  const pokemonName = params.name;

  if (!pokemonName || pokemonName.length === 0) {
    return json({ pokemon: null });
  }

  let pokemonData = null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    pokemonData = await res.json();
  } catch (e) {
    return json({ pokemon: null });
  }

  const pokemon: Pokemon = {
    id: pokemonData.id,
    name: pokemonData.name,
    sprite: pokemonData.sprites.front_shiny
  };

  return json({ pokemon });
};

export default function PokemonPage() {
  const { pokemon } = useLoaderData();
  const actionData = useActionData();

  const [name, setName] = useState<string>();

  function handleOnChange(v: ChangeEvent<HTMLInputElement>) {
    setName(v.target.value);
  }

  return (
    <div className='flex flex-col items-center gap-y-4 py-4'>
      <form method='post'>
        <div className='flex flex-row gap-x-2'>
          <Input type='text' name='name' onChange={handleOnChange} value={name} placeholder={'Type Pikachu'} />
          <Button type='submit' name='search'>Search</Button>
        </div>
      </form>

      {pokemon && !actionData?.error ? (
        <PokemonCard id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} />
      ) : (
        <Error message={actionData?.error ? actionData.error : 'No pokemon found, please try another one'} />
      )}
    </div>
  );
}
