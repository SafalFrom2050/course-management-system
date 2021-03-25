/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import './AssignmentSubmissions.css';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

import { useHttpClient } from '../../../hooks/http-hook';
import AssignmentList from '../../../components/Staff/AssignmentList';

export default function AssignmentSubmissions() {
  const [assignments, setAssignments] = useState([]);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('userData'));
  const history = useHistory();

  useEffect(() => {
    downloadAssignments();
  }, []);

  const downloadAssignments = async () => {
    const result = await sendRequest(`http://localhost:5000/staff/getAllAssignments?module_id=${user.module_id}`, 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }
    setAssignments(result.data);
  };

  const viewSubmissions = (id, module_name, semester, title) => {
    history.push({
      pathname: '/assignments/view',
      search: `assignment_id=${id}`,
      data: { module_name, semester, title },
    });
  };

  const createAssignment = () => {
    history.push({
      pathname: '/assignments/create',
    });
  };

  return (
    <>
      <h2>Assignments</h2>
      <div className="assignment-list">
        <button className="create-assignment-button" type="button" onClick={createAssignment}>Create New +</button>

        {assignments.map((item) => (
          <AssignmentList
            key={item.deadline}
            module_name={item.module_name}
            title={item.title}
            content={item.content}
            deadline={item.deadline}
            semester={item.semester}
            view={() => {
              viewSubmissions(item.assignment_id,
                item.module_name,
                item.semester,
                item.title);
            }}
          />
        ))}
      </div>
    </>
  );
}
