/* eslint-disable jsx-a11y/label-has-associated-control */
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
  const [courses, setCourses] = useState([]);

  const { sendRequest, error } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  useEffect(() => {
    downloadModules('101');
    loadCourses();
  }, []);

  useEffect(() => {
    if (error) {
      showAlertBox(error.response.data.message, 2000);
    }
  }, [error]);

  const downloadModules = async (course_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/admin/getAllModules?course_id=${course_id}`, 'GET', config).catch((err) => {
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

  const loadCourses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/getAllCourses', 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error fetching courses. Try again', 2000);
    }
    setCourses(result.data);
  };

  const removeModule = async (module_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/deleteModule', 'POST', { module_id }, config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setModules((prevState) => {
      const newArray = prevState.filter((item) => item.module_id !== module_id);
      return newArray;
    });
  };

  return (
    <div className="containAllModules">

      <div className="action-btn-container">
        <button className="create-module-btn" type="button" onClick={() => { history.push('/modules/add'); }}>Add New +</button>
      </div>

      <div className="all-module-selector">
        <label htmlFor="modules">Select Course</label>

        <select
          name="modules"
          id="modules-selector"
          onChange={(e) => {
            downloadModules(e.target.value);
          }}
        >
          {courses.map((item) => <option value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}

        </select>
      </div>
      <div className="all-module-list">
        {modules.map((item, index) => (
          <ModuleItem
            module_id={item.module_id}
            module_name={item.module_name}
            module_credit={item.module_credit}
            module_level={item.module_level}
            course_id={item.course_id}
            key={item.module_id}
            edit={() => { redirectToEdit(index); }}
            remove={() => { removeModule(item.module_id); }}
          />
        ))}
      </div>
    </div>
  );
}
