/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { useHttpClient } from '../../../hooks/http-hook';
import SubmissionItem from '../../../components/Staff/SubmissionItem';

export default function ViewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [count, setCount] = useState(0);

  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const location = useLocation().search;
  const { module_name, semester, title } = useLocation().data;
  const id = new URLSearchParams(location).get('assignment_id');

  useEffect(() => {
    downloadSubmissions(id);
    getSubmissionCount(id);
  }, []);

  const getSubmissionCount = async (assignment_id) => {
    const result = await sendRequest(`http://localhost:5000/staff/getSubmissionCount?assignment_id=${assignment_id}`, 'GET', {
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
    setCount(result.data);
  };

  const downloadSubmissions = async (assignment_id) => {
    const result = await sendRequest(`http://localhost:5000/staff/getSubmissions?assignment_id=${assignment_id}`, 'GET', {
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
    setSubmissions(result.data);
  };

  return (
    <>
      <div className="assignment-list">
        <div className="heading">
          {module_name}
          {' '}
          |
          {title}
        </div>
        <div className="details">
          <ul>
            <li>
              Module:
              <label className="data">{module_name}</label>
            </li>

            <li>
              Semester:
              <label className="data">{semester}</label>
            </li>

            <li>
              Total Submissions:
              <label className="data">{count}</label>
            </li>
          </ul>
        </div>
      </div>
      {submissions.map((item) => (
        <SubmissionItem
          name={item.name}
          surname={item.surname}
          content={item.content}
          submission_date={item.submission_date}
          title={item.title}
        />
      ))}
    </>
  );
}
