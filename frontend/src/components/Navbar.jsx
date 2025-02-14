import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center w-3/4 mx-auto my-4 p-4 '>
      {/* Логотип та назва */}
      <div>
        <NavLink to='/' className='text-black text-4xl font-bold'>
          Cardio <span className='bg-black text-white px-2 py-1 rounded'>hub</span>
        </NavLink>
      </div>

      {/* Навігаційні посилання */}
      <div className='flex justify-between w-2/5 text-2xl  font-bold' >
        <NavLink to='/posts' className='hover:text-gray-700  text-black transition duration-300'>
          Статті
        </NavLink>
        <NavLink to='/saved-posts' className=' hover:text-gray-700  text-black transition duration-300'>
          Збережені
        </NavLink>
        <NavLink to='/add-post' className=' hover:text-gray-700  text-black transition duration-300'>
          Створити
        </NavLink>
      </div>

      {/* Кнопка входу */}
      <div>
        <NavLink to='/login' className='text-2xl  font-bold bg-black text-white px-6 py-3 rounded-lg hover:bg-white border-6 border-black hover:text-black transition duration-300'>
          Вхід
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
