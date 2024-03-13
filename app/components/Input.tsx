import React from 'react';

export default function Input({ id, name, onChange, value, type }: React.ComponentProps<'input'>) {
  return (
    <input
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      className='shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    />
  );
}