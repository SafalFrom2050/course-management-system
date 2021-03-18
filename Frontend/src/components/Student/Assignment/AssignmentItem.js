/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AssignmentItem(props) {
  const [fullTextView, setFullTextView] = useState(false);
  const history = useHistory();

  function toggleFullTextView() {
    setFullTextView((prevFullTextView) => !prevFullTextView);
  }

  return (

    <>

      <div className="assignment-item">
        {/* <!-- Assignment Detail, Active Item! --> */}
        <div className={`assignment-detail ${fullTextView === true ? 'assignment-detail-full-text' : ''}`} onClick={toggleFullTextView}>
          <div className="assignment-heading">{props.heading}</div>

          {/* <!-- Body information container --> */}
          <div className="body-container">
            <div className="body">
              {props.body}
            </div>
            <div className="data-label">
              Assignment Due
              <label className="data">{props.deadline.split('T')[0]}</label>
            </div>
          </div>

          {/* <!-- Create diary, only for active item --> */}
          {
                        fullTextView === true ? (
                          <button
                            className="create-diary-btn"
                            type="button"
                            onClick={() => {
                              history.push({
                                pathname: '/assignments/submit',
                                assignment_id: props.assignment_id,
                              });
                            }}
                          >
                            Submit Assignment
                          </button>
                        ) : ''
                    }

        </div>
      </div>

    </>

  );
}
