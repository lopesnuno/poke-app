import { json } from '@remix-run/react';
import { useLoaderData, useNavigate } from 'react-router';
import { ChangeEvent, useState } from 'react';
import PokemonCard from '~/components/PokemonCard';

type Pokemon = {
  id: string, name: string, sprite: string
};

export const loader = async ({ request, params }) => {
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
  const [name, setName] = useState<string>();

  const navigate = useNavigate();

  function handleOnChange(v: ChangeEvent<HTMLInputElement>) {
    setName(v.target.value.toLowerCase());
  }

  function handleOnClick() {
    navigate(`/${name}`);
  }

  return (
    <>
      <div>
        <input type='text' name='name' onChange={handleOnChange} />
        {name && name.length !== 0 && (
          <button name='search' onClick={handleOnClick}>search</button>
        )}
      </div>
      {pokemon ? (
        <>
          <PokemonCard id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} />
        </>
      ) : (
        <h1 data-cy='error'>
          No pokemon found, please try another one!
        </h1>
      )}
    </>
  );
}