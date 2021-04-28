/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';

export default function TutorItem(props) {
  const [fullTextView, setFullTextView] = useState(false);

  function toggleFullTextView() {
    setFullTextView((prevFullTextView) => !prevFullTextView);
  }
  const {
    name, surname, email, address, date_of_join, role, edit,
  } = props;
  return (
    <div
      role="button"
      tabIndex={0}
      className={`diary-detail ${fullTextView === true ? 'module-item expanded' : 'module-item'}`}
      onClick={toggleFullTextView}
      onKeyPress={toggleFullTextView}
    >
      <div className="module-detail">
        <div className="module-heading">
          {name}
          {' '}
          {surname}
        </div>

        <div className="body-container">
          <div className="data-label">
            Role
            <label className="data">{role}</label>
          </div>

          <div className="data-label">
            Email
            <label className="data">{email}</label>
          </div>
          <div className="hidden-data">
            <div className="data-label">
              Address
              <label className="data">{address}</label>
            </div>

            <div className="data-label">
              Date Joined
              <label className="data">{date_of_join.split('T')[0].replace('-', ' - ')}</label>
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
