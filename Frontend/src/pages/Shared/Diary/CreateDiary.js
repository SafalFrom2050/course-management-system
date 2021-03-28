/* eslint-disable react/prop-types */
import './createDiary.css';

import {
  React, useState, useContext,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';

export default function CreateDiary(props) {
  const { page } = props;
  const [diaryBody, setDiaryBody] = useState('');
  const [diaryHeading, setDiaryHeading] = useState('');
  // Date to set for future
  const [date] = useState((new Date()).toISOString().replace('T', ' ').split('Z')[0]);

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation().recipient_id;
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  // Creates a diary with date property set to current system date
  async function createDiary(e) {
    e.preventDefault();

    let payload = {
      title: diaryHeading,
      body: diaryBody,
    };

    if (page === 'message') {
      payload = {
        title: diaryHeading,
        message: diaryBody,
        userType: user.userType,
        recipient_id: location,
      };
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };
    let endpoint = `http://localhost:5000/common/setDiaries?userType=${auth.userType}`;
    if (page === 'message') {
      endpoint = 'http://localhost:5000/common/sendMessage';
    }
    const result = await sendRequest(endpoint, 'POST', payload, config).catch((error) => {
      console.log(error);
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }

    if (page === 'diary') {
      showAlertBox('Diary Created!', 2000);
      history.push('/diary');
      return;
    }
    showAlertBox('Message sent!', 2000);
    history.push(`/personal-tutor/messages?recipient_id=${location}`);
  }

  return (

    <>
      <div className="diary-create-box">
        <div className="create-diary-label">Create New +</div>

        <div className="diary-form">
          <div className="diary-detail">
            <form onSubmit={createDiary}>
              <input
                className="diary-heading"
                type="text"
                name=""
                id=""
                placeholder="Heading..."
                required
                onChange={(e) => setDiaryHeading(e.target.value)}
              />
              <label htmlFor="diary-body" className="diary-date">{date.split(' ')[0]}</label>
              <textarea
                className="diary-body"
                name="diary-body"
                id=""
                cols="60"
                rows="10"
                required
                onChange={(e) => setDiaryBody(e.target.value)}
              />

              {/* <!-- Save diary --> */}
              <button className="save-diary-btn" type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>

    </>

  );
}
