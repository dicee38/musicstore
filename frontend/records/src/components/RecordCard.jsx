import React from 'react';

export default function RecordCard({ record }) {
  console.log('RecordCard props:', record);
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
      <h4>{record.title}</h4>
      <p>{record.year}</p>
    </div>
  );
}
