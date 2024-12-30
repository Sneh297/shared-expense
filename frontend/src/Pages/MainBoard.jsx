import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Card from './Card';

import AddCardModal from './AddCardModal';
import { URL } from './URL';

function MainBoard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${URL}/api/card/cards?id=${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardAdded = (newCard) => {
    setData((prevData) => [...prevData, newCard]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <button
        onClick={() => setIsModalOpen(true)}
        className='fixed bottom-8 right-8 bg-green-600 text-white 
                    rounded-full w-12 h-12 text-2xl shadow-lg hover:bg-green-700'
      >
        +
      </button>
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCardAdded={handleCardAdded}
      />
      {data ? <Card data={data} /> : ''}
    </>
  );
}

export default MainBoard;
