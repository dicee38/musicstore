import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEnsembleById } from '../api/ensemblesApi';

export default function EnsembleDetailPage() {
  const { id } = useParams();
  const [ensemble, setEnsemble] = useState(null);

  useEffect(() => {
    getEnsembleById(id).then(setEnsemble);
  }, [id]);

  if (!ensemble) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{ensemble.name}</h2>
      <h3>Состав:</h3>
      <ul>
        {ensemble.members.map((member, index) => (
          <li key={index}>{member.name} — {member.instrument}</li>
        ))}
      </ul>
      <h3>Произведения:</h3>
      <ul>
        {ensemble.compositions.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
      <h3>Пластинки:</h3>
      <ul>
        {ensemble.records.map((r) => (
          <li key={r.id}>{r.title} ({r.year})</li>
        ))}
      </ul>
    </div>
  );
}
