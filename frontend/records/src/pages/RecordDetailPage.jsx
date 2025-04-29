import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecordById } from '../api/recordsApi';

export default function RecordDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    getRecordById(id).then(setRecord);
  }, [id]);

  if (!record) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{record.title}</h2>
      <p>Год: {record.year}</p>
      <p>Ансамбль: {record.ensemble}</p>
      <p>Описание: {record.description}</p>
    </div>
  );
}
