import './ModuleMaterials.css';
import React, { useState, useEffect, useContext } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function ModuleMaterials() {
  const [readingMaterialsList, setReadingMaterialsList] = useState([]);
  const history = useHistory();
  const params = useParams();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    if (auth.token) getReadingMaterialsList(params.module_id);
  }, [auth.token]);

  async function getReadingMaterialsList(module_id) {
    const result = await sendRequest(`http://localhost:5000/common/modules/getReadingMaterials/?module_id=${module_id}`, 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    setReadingMaterialsList(result.data);
    console.log(result.data);
  }

  const redirectToAddMaterials = () => {
    history.push({
      pathname: '/modules/create',
    });
  };

  return (
    <div className="reading-materials-list">
      <h3>Reading Materials</h3>
      <button className="action-btn" type="button" onClick={redirectToAddMaterials}>New +</button>
      {
        readingMaterialsList.map((item) => (
          <div className="reading-material-item">
            <div className="details">
              <div className="heading">{item.title}</div>
              <div className="body">{item.body}</div>
            </div>
          </div>
        ))
        }
    </div>
  );
}
