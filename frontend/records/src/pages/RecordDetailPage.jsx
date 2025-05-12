// RecordDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecordById } from '../api/recordsApi';

export default function RecordDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecordById(id)
      .then((data) => {
        setRecord(data);
      })
      .catch((err) => {
        setError(`Ошибка при получении данных: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{record.title}</h2>
      <p>{record.artist}</p>
      <p>{record.year}</p>
      <p>{record.ensemble}</p>
      <p>{record.description}</p>
    </div>
  );
}
