import { useNavigate } from 'react-router';
import Button from '~/components/Button';

export default function PokemonCard(pokemon: { id: number, name: string, sprite: string }) {
  const navigate = useNavigate();

  function handlePrevious() {
    navigate(`/${pokemon.id - 1}`);
  }

  function handleNext() {
    navigate(`/${pokemon.id + 1}`);
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center border-2 border-gray-500 rounded p-4 gap-y-4 bg-yellow-500 w-[210px]'>
        <div className="border-2 border-gray-500 rounded p-4 bg-white">
          <img src={pokemon.sprite} alt={''} />
        </div>

        <div>
          <h1 data-cy='pokemon-number'>Number: {pokemon.id}</h1>
          <h1 data-cy='pokemon-name'>Name: {pokemon.name}</h1>
        </div>


        <div className='flex flex-row gap-x-2'>
          {pokemon.id !== 1 && (<Button name='previous' onClick={handlePrevious}>Previous</Button>)}
          <Button name='next' onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}