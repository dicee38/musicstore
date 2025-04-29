import React, { useEffect, useState } from 'react';
import { getTopSales } from '../api/topApi';

export default function TopSalesPage() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    getTopSales().then(setTop);
  }, []);

  return (
    <div>
      <h2>Лидеры продаж – {new Date().getFullYear()}</h2>
      <ul>
        {top.map((item, i) => (
          <li key={item.id}>
            {i + 1}. {item.title} — {item.sales} продаж
          </li>
        ))}
      </ul>
    </div>
  );
}
