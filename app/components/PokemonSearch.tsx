import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export default function PokemonSearch() {
  const [name, setName] = useState<string>();
  const navigate = useNavigate();

  function handleOnChange(v: ChangeEvent<HTMLInputElement>) {
    setName(v.target.value.toLowerCase());
  }

  function handleOnClick() {
    navigate(`/${name}`);
  }

  return (
    <div>
      <input type='text' name='name' onChange={handleOnChange} />
      {name && name.length !== 0 && (
        <button type='submit' name='search' onClick={handleOnClick}>search</button>
      )}
    </div>
  );
}