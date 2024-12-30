import React from 'react';

const Navbar = () => {
  const handleclick = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };
  return (
    <nav className='bg-green-600 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a href='/' className='text-lg font-bold'>
              Track-Expense
            </a>
          </div>

          {/* Profile and Logout */}
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <img
                className='h-10 w-10 rounded-full border-2 border-white'
                src='https://via.placeholder.com/40'
                alt='Profile'
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleclick}
              className='bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
