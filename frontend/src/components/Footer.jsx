import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex flex-row justify-between items-center w-3/4 mx-auto my-4 p-4 '>
      {/* Логотип та назва */}
      <div>
        <NavLink to='/' className='text-black text-4xl font-bold'>
          Cardio <span className='bg-black text-white px-2 py-1 rounded'>hub</span>
        </NavLink>
      </div>

      {/* Навігаційні посилання */}
      <div className='text-2xl font-bold'>
        <NavLink to='/about' className=' hover:text-gray-700 text-black transition duration-300'>
          Про проект
        </NavLink>
      </div>

      {/* Кнопка контактів */}
      <div>
        <NavLink to='/contact' className='text-2xl font-bold  hover:text-gray-700 text-black transition duration-300'>
          Контакти
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;