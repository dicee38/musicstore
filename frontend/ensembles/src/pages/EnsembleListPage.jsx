import React, { useEffect, useState } from 'react';
import { getAllEnsembles } from '../api/ensemblesApi';
import { Link } from 'react-router-dom';

export default function EnsembleListPage() {
  const [ensembles, setEnsembles] = useState([]);

  useEffect(() => {
    getAllEnsembles().then(setEnsembles);
  }, []);

  return (
    <div>
      <h2>Ансамбли</h2>
      <ul>
        {ensembles.map((ens) => (
          <li key={ens.id}>
            <Link to={`/ensembles/${ens.id}`}>{ens.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
