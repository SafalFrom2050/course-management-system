import './createDiary.css';

import { React, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';

export default function CreateDiary() {
  const [diaryBody, setDiaryBody] = useState('');
  const [diaryHeading, setDiaryHeading] = useState('');

  const { sendRequest } = useHttpClient();
  const user = JSON.parse(localStorage.getItem('userData'));
  const auth = useContext(AuthContext);

  // Date to set for future
  const [date] = useState(() => new Date().toISOString().replace('T', ' ').split('Z')[0]);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  // Creates a diary with date property set to current system date
  async function createDiary(e) {
    e.preventDefault();

    const payload = {
      title: diaryHeading,
      body: diaryBody,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/common/setDiaries?userType=${user.userType}`, 'POST', payload, config).catch((error) => {
      showAlertBox('Network error! Please try again later...', 2000);
      console.log(`error:${error}`);
    });
    if (!result) {
      return;
    }

    showAlertBox('Diary Created!', 2000);

    history.push('/diary');
  }

  // async function onEdit(diaryId) {
  //   // TODO
  // }

  return (

    <>
      <div className="diary-create-box">
        <div className="create-diary-label">Create New +</div>

        {/* <!-- Diary Form -->

                <!-- Diary Form
                    > Diary Detail
                        > diary Heading, Date Label, Body
                            > Body, Data Label
                                > Edit Diary Button -->

                <!-- Diary Item Without Full Text--> */}

        <div className="diary-form">
          {/* <!-- Diary Detail --> */}
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
