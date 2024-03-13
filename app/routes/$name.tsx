import { json } from '@remix-run/react';
import { useLoaderData } from 'react-router';
import { ChangeEvent, useState } from 'react';
import PokemonCard from '~/components/PokemonCard';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { redirect } from '@remix-run/node';

type Pokemon = {
  id: string, name: string, sprite: string
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionId = formData.get('action');

  if (actionId && actionId.length !== 0) {
    const pokemonId = formData.get('pokemon-id');

    return redirect(`/${actionId === 'next' ? Number(pokemonId) + 1 : Number(pokemonId) - 1}`);
  } else {
    const pokemonName = formData.get('name');

    return redirect(`/${pokemonName}`);
  }
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
    sprite: pokemonData.sprites.front_shiny as string
  };

  return json({ pokemon });
};

export default function PokemonPage() {
  const { pokemon } = useLoaderData();
  const [name, setName] = useState<string>(pokemon ? pokemon.name as string : '');

  function handleOnChange(v: ChangeEvent<HTMLInputElement>) {
    setName(v.target.value.toLowerCase());
  }

  return (
    <div className='flex flex-col items-center gap-y-4 py-4'>
      <form method='post'>
        <div className='flex flex-row gap-x-2'>
          <Input type='text' name='name' onChange={handleOnChange} value={name} />
          {name && name.length !== 0 && (
            <Button type='submit' name='search'>Search</Button>
          )}
        </div>
      </form>

      {pokemon ? (
        <>
          <PokemonCard id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} />
        </>
      ) : (
        <h1 data-cy='error'>
          No pokemon found, please try another one!
        </h1>
      )}
    </div>
  );
}