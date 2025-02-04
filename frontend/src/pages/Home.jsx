import React from 'react';
import { NavLink } from 'react-router-dom';
import data from '../../data.json'; // Імпортуємо дані з JSON

const Home = () => {
  const { categories } = data; // Отримуємо категорії з JSON

  return (
    <div className="p-8 w-3/4  mx-auto my-0">
      <div className="space-y-4">
        {categories.map((category, index) => (
          <NavLink
            to='/' // Генеруємо URL
            key={index}
            className="block w-full p-6 bg-white "
          >
            <div className="flex items-center justify-between">

              <div className='w-3/4'>
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-gray-700">{category.body}</p>
              </div>
              <img
                src={category.image}
                alt={category.title}
                className="w-42 h-42 object-cover rounded-lg mr-6"
              />

            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
