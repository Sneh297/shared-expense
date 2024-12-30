import { useState } from 'react';
import { URL } from './URL';

const AddCardModal = ({ isOpen, onClose, onCardAdded }) => {
  const [cardName, setCardName] = useState(''); // State for card name
  const [cardDetails, setCardDetails] = useState(''); // State for card details
  const [contributorName, setContributorName] = useState(''); // State for contributor's name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const id = localStorage.getItem('userId'); // Getting the user ID from local storage

    const contributor = [
      {
        name: contributorName,
        amount: 0, // Default amount is 0
      },
    ];

    try {
      const response = await fetch(`${URL}/api/card/create-card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardname: cardName,
          carddetails: cardDetails,
          contributor: contributor,
          id: id, // Include the user ID in the request
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      onCardAdded(result);
      setCardName('');
      setCardDetails('');
      setContributorName('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-xl font-bold'
        >
          ×
        </button>

        <h2 className='text-2xl font-semibold mb-4'>Add New Card</h2>

        <form onSubmit={handleSubmit}>
          {/* Card Name Input */}
          <div className='mb-4'>
            <label
              htmlFor='cardname'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Card Name
            </label>
            <input
              type='text'
              id='cardname'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>

          {/* Card Details Input */}
          <div className='mb-4'>
            <label
              htmlFor='carddetails'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Card Details
            </label>
            <input
              type='text'
              id='carddetails'
              value={cardDetails}
              onChange={(e) => setCardDetails(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>

          {/* Contributor Name Input */}
          <div className='mb-4'>
            <label
              htmlFor='contributor'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Contributor Name
            </label>
            <input
              type='text'
              id='contributor'
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>

          {/* Displaying error */}
          {error && (
            <div className='mb-4 text-red-500 text-sm'>Error: {error}</div>
          )}

          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-600 hover:text-gray-800'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-green-600 text-white rounded-md
                       hover:bg-green-700 disabled:bg-green-400
                       disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Adding...' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
