import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ data }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Cards</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map((item) => (
          <div
            key={item._id}
            className='bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-200'
            onClick={() => handleCardClick(item._id)}
          >
            <h2 className='text-xl font-semibold text-green-600'>
              {item.cardname}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
