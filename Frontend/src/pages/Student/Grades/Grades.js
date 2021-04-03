/* eslint-disable no-unused-vars */
import './Grades.css';
import {
  React, useContext, useEffect, useState,
} from 'react';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import GradeItem from '../../../components/Student/Grades/GradeItem';
import FeedbackItem from '../../../components/Student/Grades/FeedbackItem';

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    downloadGrades();
    downloadFeedbacks();
  }, []);

  const downloadGrades = async () => {
    const result = await sendRequest('http://localhost:5000/student/getGrades', 'GET', {
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
    setGrades(result.data);
  };

  const downloadFeedbacks = async () => {
    const result = await sendRequest('http://localhost:5000/student/getFeedbacks', 'GET', {
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
    setFeedbacks(result.data);
  };

  return (
    <>
      <div className="grades-list">
        <div className="level-seperator">
          <h3>Grades</h3>
        </div>

        {grades.map((item) => (
          <GradeItem
            module_name={item.module_name}
            semester={item.semester}
            rank={item.rank}
            tutor_name={item.staff}
            module_id={item.module_id}
          />
        ))}
      </div>
      <div className="feedbacks-list">
        <div className="level-seperator">
          <h3>Feedbacks</h3>
        </div>
        {feedbacks.map((item) => (
          <FeedbackItem
            module_name={item.module_name}
            staff={item.staff}
            module_id={item.module_id}
            feedback={item.feedback}
            semester={item.semester}
          />
        ))}
      </div>
    </>
  );
}
