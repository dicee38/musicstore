import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/auth">Auth</Link> |{' '}
      <Link to="/records">Records</Link> |{' '}
      <Link to="/ensembles">Ensembles</Link> |{' '}
      <Link to="/compositions">Compositions</Link> |{' '}
      <Link to="/top">Top</Link> |{' '}
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
