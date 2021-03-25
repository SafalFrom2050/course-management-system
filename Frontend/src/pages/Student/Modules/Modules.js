import './modules.css';
import React, { useState, useEffect, useContext } from 'react';
import ModuleItem from '../../../components/Student/Module/ModuleItem';

import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Modules() {
  const [modulesList, setModulesList] = useState([]);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token)getModulesList();
  }, [auth.token]);

  async function getModulesList() {
    const result = await sendRequest('http://localhost:5000/student/modules', 'GET', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    console.log(result.data);
    setModulesList(result.data);
  }

  return (
    <div className="module-list">
      {modulesList.map((module) => (
        <ModuleItem
          key={module.module_id}
          moduleId={module.module_id}
          heading={module.module_name}
          tutor={`${module.tutor_name} ${module.tutor_surname}`}
          nextClass=""
        />
      ))}
    </div>
  );
}
