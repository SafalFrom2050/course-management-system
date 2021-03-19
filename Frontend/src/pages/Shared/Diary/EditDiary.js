import './createDiary.css';

import {
  React, useState, useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';

export default function EditDairy() {
  const history = useHistory();
  const params = useParams();
  const [diaryBody, setDiaryBody] = useState('');
  const [diaryHeading, setDiaryHeading] = useState('');
  // Date to set for future
  const [date, setDate] = useState('');

  const { sendRequest } = useHttpClient();
  const user = JSON.parse(localStorage.getItem('userData'));
  const auth = useContext(AuthContext);

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    if (auth.token) getDiaryById(params.id);
  }, [auth.token]);

  async function getDiaryById(id) {
    const result = await sendRequest(`http://localhost:5000/common/getDiaryById?userType=${auth.userType}&diary_id=${id}`, 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    const data = result.data[0];
    setDiaryHeading(data.title);
    setDiaryBody(data.body);
    setDate(data.date_created.replace('T', ' ').split('Z')[0]);
  }

  async function onEdit(e, diaryId) {
    e.preventDefault();

    const payload = {
      title: diaryHeading,
      body: diaryBody,
      diary_id: diaryId,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/common/editDiaries?userType=${user.userType}`, 'PATCH', payload, config).catch((error) => {
      console.log(error);
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }

    showAlertBox('Diary Editted!', 2000);

    history.push('/diary');
  }

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
            <form onSubmit={(e) => { onEdit(e, params.id); }}>
              <input
                className="diary-heading"
                type="text"
                name=""
                id=""
                placeholder="Heading..."
                required
                value={diaryHeading}
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
                value={diaryBody}
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
