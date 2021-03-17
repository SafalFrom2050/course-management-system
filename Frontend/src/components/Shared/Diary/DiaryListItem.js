/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
    props.heading
    props.body
    props.date
    props.onEdit
    props.onDelete
*/
export default function DiaryListItem(props) {
  const {
    heading, body, date, onEdit, onDelete,
  } = props;

  const [fullTextView, setFullTextView] = useState(false);

  function toggleFullTextView() {
    setFullTextView((prevFullTextView) => !prevFullTextView);
  }

  return (
    <div className="diary-item">
      {/* <!-- Diary Detail, Active Item! --> */}
      <div
        role="button"
        tabIndex={0}
        className={`diary-detail ${fullTextView === true ? 'diary-detail-full-text' : ''}`}
        onClick={toggleFullTextView}
        onKeyPress={toggleFullTextView}
      >
        <div className="diary-heading">{heading}</div>

        {/* <!-- Body information container --> */}
        <div className="body-container">
          <div className="body">
            {body}

          </div>
          <div className="data-label">
            <label className="data">
              {
                        date.split('T', 1)
                    }
            </label>
          </div>

          {/* <!-- Edit diary, only for active item --> */}
          <button className="action-btn" onClick={onEdit} type="submit">Edit</button>
          <button className="action-btn" onClick={onDelete} type="submit">Delete</button>
        </div>
      </div>
    </div>
  );
}

DiaryListItem.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
