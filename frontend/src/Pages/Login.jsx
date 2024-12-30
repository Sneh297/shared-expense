import React, { useState } from 'react';
import { URL } from './URL';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill all the fields');
      return;
    }

    setLoading(true); // Start loading state
    setError(''); // Reset any previous error

    try {
      const response = await fetch(URL + '/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // On success, you can redirect or handle the result (like saving user info)
        console.log('Logged in successfully:', result);
        alert('Login successful!');

        localStorage.setItem('userId', result.user);
        window.location.href = '/';
        // Optionally redirect to another page here (e.g., using `useNavigate()` for React Router)
      } else {
        // Handle errors from the backend
        setError(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-green-50'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold text-center text-green-600'>Login</h2>
        {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
        <form onSubmit={handleSubmit} className='mt-4'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              className='w-full p-2 border border-gray-300 rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              className='w-full p-2 border border-gray-300 rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-500'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='mt-4 text-center'>
          Don't have an account?{' '}
          <a href='/sign-up' className='text-green-600'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
