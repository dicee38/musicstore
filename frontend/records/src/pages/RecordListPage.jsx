import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../api/recordsApi';
import RecordCard from '../components/RecordCard';
import { Link } from 'react-router-dom';

export default function RecordListPage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);  // Добавляем состояние для ошибок

  useEffect(() => {
    // Добавляем обработку ошибок в useEffect
    const fetchRecords = async () => {
      try {
        const data = await getAllRecords();
        setRecords(data);
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Не удалось загрузить записи');
      }
    };

    fetchRecords();
  }, []);

  // Если ошибка есть, показываем сообщение об ошибке
  if (error) {
    return <div>{error}</div>;
  }

  console.log('Fetched records:', records);
  return (
    <div>
      
      <h2>Каталог пластинок</h2>
      {records.map((record) => (
        <Link key={record.id} to={`/records/${record.id}`}>
          <RecordCard record={record} />
        </Link>
      ))}
    </div>
  );
}
