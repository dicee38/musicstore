import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEntities } from '../api/adminApi';
import EntityTable from '../components/EntityTable';


export default function EntityManager() {
  const { entity } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEntities(entity).then(setData);
  }, [entity]);

  return (
    <div>
      <h2>{entity.toUpperCase()}</h2>
      <EntityTable data={data} />
    </div>
  );
}
