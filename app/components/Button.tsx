import React from 'react';

export default function Button({ id, name, value, type, onClick, children }: React.ComponentProps<'button'>) {
  return (
    <button
      id={id}
      name={name}
      value={value}
      type={type}
      onClick={onClick}
      className='shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
    >
      {children}
    </button>
  );
}