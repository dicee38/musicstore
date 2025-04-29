import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../api/recordsApi';
import RecordCard from '../components/RecordCard';
import { Link } from 'react-router-dom';

export default function RecordListPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getAllRecords().then(setRecords);
  }, []);

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
