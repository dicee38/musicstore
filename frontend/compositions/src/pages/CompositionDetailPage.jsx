import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompositionById } from '../api/compositionsApi';

export default function CompositionDetailPage() {
  const { id } = useParams();
  const [composition, setComposition] = useState(null);

  useEffect(() => {
    getCompositionById(id).then(setComposition);
  }, [id]);

  if (!composition) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{composition.title}</h2>
      <p><strong>Композитор:</strong> {composition.composer}</p>
      <p><strong>Описание:</strong> {composition.description}</p>

      <h3>Связанные пластинки:</h3>
      <ul>
        {composition.records.map((r) => (
          <li key={r.id}>{r.title} ({r.year})</li>
        ))}
      </ul>
    </div>
  );
}
