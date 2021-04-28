/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './PersonalTutor.css';

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import StudentItem from '../../../components/Staff/StudentItem';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function PersonalTutor() {
  const [students, setStudents] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  useEffect(() => {
    downloadStudentList();
  }, []);

  const downloadStudentList = async () => {
    const result = await sendRequest('http://localhost:5000/staff/getAllAssignedStudents', 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    setStudents(result.data);
  };

  const redirectToMessages = (id) => {
    history.push({
      pathname: '/personal-tutor/messages',
      search: `recipient_id=${id}`,
    });
  };

  return (
    <div className="student-list">
      {students.map((item) => (
        <StudentItem
          name={`${item.name} ${item.surname}`}
          lastConvo={new Date(item.lastConvo).toDateString()}
          lastMessage={item.lastMessage.slice(0, 50)}
          semester={item.semester}
          messageHandler={() => { redirectToMessages(item.student_id); }}
        />
      ))}
    </div>
  );
}
