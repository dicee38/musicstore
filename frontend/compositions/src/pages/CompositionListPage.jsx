import React, { useEffect, useState } from 'react';
import { getAllCompositions } from '../api/compositionsApi';
import { Link } from 'react-router-dom';

export default function CompositionListPage() {
  const [compositions, setCompositions] = useState([]);

  useEffect(() => {
    getAllCompositions().then(setCompositions);
  }, []);

  return (
    <div>
      <h2>Произведения</h2>
      <ul>
        {compositions.map((comp) => (
          <li key={comp.id}>
            <Link to={`/compositions/${comp.id}`}>{comp.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
