/* eslint-disable no-unused-vars */
import './AllModules.css';
import {
  React, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import ModuleItem from '../../../components/Admin/Module/ModuleItem';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

export default function AllModules() {
  const [modules, setModules] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  useEffect(() => {
    downloadModules();
  }, []);

  const downloadModules = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/getAllModules', 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error while getting module. Try again..', 2000);
      return;
    }
    setModules(result.data);
  };

  const redirectToEdit = (index) => {
    history.push({
      pathname: '/modules/edit',
      moduleObj: modules[index],
      mode: 'edit',
    });
  };

  return (
    <div>
      <div className="action-btn-container">
        <button className="create-module-btn" type="button" onClick={() => { history.push('/modules'); }}>Add New +</button>
      </div>
      <div className="module-list">
        {modules.map((item, index) => (
          <ModuleItem
            module_id={item.module_id}
            module_name={item.module_name}
            module_credit={item.module_credit}
            module_level={item.module_level}
            course_id={item.course_id}
            key={item.module_id}
            edit={() => { redirectToEdit(index); }}
          />
        ))}
      </div>
    </div>
  );
}