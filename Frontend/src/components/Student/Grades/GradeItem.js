/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function GradeItem(props) {
  const {
    module_name, rank, tutor_name, semester, module_id, redirect,
  } = props;
  return (

    <div className="grade-item" onClick={redirect} role="navigation">
      <div className="grade-detail">
        <div className="grade-heading">
          {module_name}
&nbsp; | &nbsp;
          {module_id}
          &nbsp;
          {' '}
          | Semester&nbsp;&nbsp;
          {semester}
          <h1 id="grade">{rank}</h1>
        </div>

        <div className="body-container">
          <div className="body">
            This is a grade. Upon click, it will take us to the individual
            grade page and allow to print the document.
          </div>

          <div className="data-label">
            Tutor
            <label className="data">{tutor_name}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
