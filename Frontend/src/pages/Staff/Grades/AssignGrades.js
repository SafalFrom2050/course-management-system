/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './AssignGrades.css';
import { React, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

export default function AssignGrades() {
  const [feedback, setFeedback] = useState('');
  const [rank, setRank] = useState('none');

  const data = useLocation().studentInfo;
  const user = JSON.parse(localStorage.getItem('userData'));
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();

  if (!data) {
    history.push('/assignments');
    return 0;
  }

  const textChangeHandler = (e) => {
    setFeedback(e.target.value);
  };

  const rankChangeHandler = (e) => {
    setRank(e.target.value);
  };

  const formSubmitHandler = async () => {
    const payload = {
      module_id: user.module_id,
      student_id: data.student_id,
      semester: data.semester,
    };

    if (rank === 'none') {
      if (feedback.trim().length === 0) {
        showAlertBox('Type something into the feedback', 2000);
        return;
      }
      payload.feedback = feedback;
      payload.rank = null;
    } else {
      payload.feedback = '';
      payload.rank = rank;
    }

    const result = await sendRequest('http://localhost:5000/staff/gradeAssignment', 'POST', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    showAlertBox('Grade added...', 2000);
    setFeedback('');
    setRank('none');
  };
  return (
    <>
      <div className="feedback-create-box">
        <div className="heading">
          <h3>
            {data.module_name}
          </h3>

        </div>
        <div className="details">
          <ul>
            <li>
              Module:
              <label className="data">{data.module_name}</label>
            </li>

            <li>
              Semester:
              <label className="data">{data.semester}</label>
            </li>

            <li>
              Student Name:
              <label className="data">{data.name}</label>
            </li>
          </ul>
        </div>

        <div className="feedback-form">

          <div className="feedback-detail">
            <form onSubmit={(e) => { e.preventDefault(); }}>

              <label className="feedback-date" htmlFor="feedback-body">{new Date().toLocaleDateString()}</label>
              <textarea className="feedback-body" value={feedback} name="feedback-body" placeholder="Write feedback" id="" cols="30" rows="10" onChange={textChangeHandler} />
              <label id="grade-label" htmlFor="grade">Grade (Leave untouched or None if not graded)</label>
              <select className="selectGrade" onChange={rankChangeHandler}>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">A</option>
                <option value="F">F</option>
                <option value="Z">Z</option>
                <option value="none">None</option>
              </select>
              <button className="save-feedback-btn" type="button" onClick={formSubmitHandler}>Confirm</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
