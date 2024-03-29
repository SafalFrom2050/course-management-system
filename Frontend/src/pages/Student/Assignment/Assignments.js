import './assignments.css';
import React, { useState, useEffect, useContext } from 'react';
import AssignmentItem from '../../../components/Student/Assignment/AssignmentItem';

import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Assignments() {
  const [assignmentList, setAssigmentList] = useState([]);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAssignmentList();
  }, [auth.token]);

  async function getAssignmentList() {
    const result = await sendRequest('http://localhost:5000/student/assignment', 'GET', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setAssigmentList(result.data);
  }

  return (
    <>
      <div className="assignment-list">
        {assignmentList.length > 0 ? assignmentList.map((assignment) => (
          <AssignmentItem
            key={assignment.assignment_id}
            assignment_id={assignment.assignment_id}
            heading={`${assignment.title} /Module ID: ${assignment.module_id}`}
            body={assignment.content}
            deadline={new Date(assignment.deadline).toUTCString()}
          />
        )) : <p>No active assignments found.</p>}
      </div>
    </>
  );
}
