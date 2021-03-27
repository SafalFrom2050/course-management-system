/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './PersonalTutor.css';

import React, { useContext, useEffect, useState } from 'react';
import StudentItem from '../../../components/Staff/StudentItem';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function PersonalTutor() {
  const [students, setStudents] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    downloadStudentList();
  }, []);

  const messageHandler = (student_id) => {
    console.log(student_id);
  };

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

  return (
    students.map((item) => (
      <StudentItem
        name={`${item.name} ${item.surname}`}
        lastConvo={new Date(item.lastConvo).toDateString()}
        lastMessage={item.lastMessage}
        messageHandler={() => { messageHandler(item.student_id); }}
        semester={item.semester}
      />
    ))
  );
}
