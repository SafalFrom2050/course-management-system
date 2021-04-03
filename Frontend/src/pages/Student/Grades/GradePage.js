/* eslint-disable no-unused-vars */
import './GradePage.css';
import {
  React,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function GradePage() {
  const { gradeInfo } = useLocation();
  const user = JSON.parse(localStorage.getItem('userData'));
  const history = useHistory();
  if (!gradeInfo) {
    history.push('/grades');
    return 0;
  }

  return (
    <div className="grade-detail">
      <div className="heading">
        <h3>
          {gradeInfo.module_name}
          {' '}
          |
          Semester:&nbsp;
          {gradeInfo.semester}
        </h3>
      </div>

      <div className="gradeDetails">
        <div className="body1">
          <p>
            This is to certify that
            {' '}
            <strong>
              {user.gender === 'M' ? 'Mr.' : 'Ms.'}
              {' '}
              {user.name}
            </strong>
            {' '}
            has given
            the exam acheiving an
            {' '}
            <strong>{gradeInfo.rank}</strong>
            {' '}
            grade.
            <br />
            <br />
            (This is an individual grade item. This page can be printed upon
            button press.)
          </p>
        </div>

        <div className="row">
          <h4>Tutor</h4>
          <div className="data">{gradeInfo.staff}</div>

          <h4>Date</h4>
          <div className="data">02 - 01 - 2021</div>
        </div>
      </div>

      <div className="foo">
        Generated From
        <strong>Woodlands University Online Learning Portal</strong>
        , 2020 ©
      </div>
      <div className="actions">
        <button className="action-btn" type="button">Print</button>
      </div>
    </div>
  );
}
