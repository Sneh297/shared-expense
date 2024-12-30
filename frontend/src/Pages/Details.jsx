import React from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams(); // This will get the 'id' from the URL

  return (
    <div>
      <h1>Details for ID: {id}</h1>
    </div>
  );
}

export default Details;
