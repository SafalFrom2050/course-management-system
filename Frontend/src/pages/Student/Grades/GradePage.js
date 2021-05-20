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

  function printGrade() {
    const content1 = document.getElementsByClassName('heading')[0];
    const content2 = document.getElementsByClassName('gradeDetails')[0];
    const content3 = document.getElementsByClassName('foo')[0];
    const printSpace = document.getElementById('print-space').contentWindow;

    printSpace.document.open();

    // Don't print anything other than the document (initially excluding print button)
    printSpace.document.write(content1.innerHTML);
    printSpace.document.write(content2.innerHTML);
    printSpace.document.write(content3.innerHTML);

    printSpace.document.close();
    printSpace.print();
  }

  return (
    <div className="grade-page-detail" id="grade-page-detail">
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
            &emsp; This is to certify that
            {' '}
            <strong>
              {user.gender === 'M' ? 'Mr.' : 'Ms.'}
              {' '}
              {user.name}
            </strong>
            {' '}
            has given
            the exam acheiving a
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
        <button className="action-btn" onClick={printGrade} type="button">Print</button>
      </div>

      {/* Temporary fix for 'print grade' */}
      <iframe
        title="temp"
        id="print-space"
        style={{
          height: '0px',
          width: '0px',
          position: 'absolute',
        }}
      />
    </div>
  );
}
