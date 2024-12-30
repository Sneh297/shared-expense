import React, { useState } from 'react';
import { URL } from './URL';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change for email and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation (check if email and password are not empty)
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    try {
      // Make POST request to sign-up API using fetch
      const response = await fetch(URL + '/api/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Something went wrong, please try again later');
      }

      const data = await response.json();
      if (data.message === 'success') window.location.href = '/login';
    } catch (err) {
      // Handle error (user already exists, or any other error)
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-green-50'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold text-center text-green-600'>
          Sign Up
        </h2>

        {/* Display error or success message */}
        {error && <p className='text-red-600'>{error}</p>}
        {successMessage && <p className='text-green-600'>{successMessage}</p>}

        <form onSubmit={handleSubmit} className='mt-4'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-500'
          >
            Sign Up
          </button>
        </form>
        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <a href='/login' className='text-green-600'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
