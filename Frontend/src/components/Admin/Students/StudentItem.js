/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';

function StudentItem(props) {
  const [fullTextView, setFullTextView] = useState(false);

  const {
    student_id, name, course, email, status, address, phone, gender, registrationDate, dob, edit,
  } = props;

  function toggleFullTextView() {
    setFullTextView((prevFullTextView) => !prevFullTextView);
  }

  return (
    <div
      role="button"
      tabIndex="0"
      className={`${fullTextView === true ? 'student-item expanded' : 'student-item'}`}
      onClick={toggleFullTextView}
      onKeyPress={toggleFullTextView}
    >
      <div className="student-detail">
        <div className="student-heading">{name}</div>

        <div className="body-container">
          <div className="data-label">
            Course
            <label className="data">{course}</label>
          </div>

          <div className="data-label">
            Email
            <label className="data">{email}</label>
          </div>

          <div className="data-label">
            Student Status
            <label className="data">{status}</label>
          </div>

          <div className="hidden-data">
            <div className="data-label">
              Address
              <label className="data">{address}</label>
            </div>

            <div className="data-label">
              Phone Number
              <label className="data">{phone}</label>
            </div>

            <div className="data-label">
              Gender
              <label className="data">{gender}</label>
            </div>

            <div className="data-label">
              Registration Date
              <label className="data">{registrationDate}</label>
            </div>

            <div className="data-label">
              Date of Birth
              <label className="data">{dob}</label>
            </div>
          </div>

          <div className="btns-container">
            <button type="submit" onClick={edit}>Edit</button>
            <button type="submit">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentItem;
