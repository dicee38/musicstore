import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2>Админ-панель</h2>
      <iframe
        src="http://localhost:3007/d-solo/sales-dashboard"
        width="100%"
        height="500"
        frameBorder="0"
        title="Grafana Dashboard"
      ></iframe>
    </div>
  );
}
