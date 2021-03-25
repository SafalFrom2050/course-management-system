import React from 'react';

import { useLocation } from 'react-router-dom';

export default function ReadingMaterials() {
  const location = useLocation().search;
  const moduleID = new URLSearchParams(location).get('module_id');

  return (
    <>
      <h1>Reading Materials</h1>
    </>
  );
}
