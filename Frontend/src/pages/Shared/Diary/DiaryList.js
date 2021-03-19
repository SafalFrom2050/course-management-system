import './diaryList.css';

import {
  React, useState, useEffect, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';

import DiaryListItem from '../../../components/Shared/Diary/DiaryListItem';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';

export default function DiaryList() {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem('userData'));

  const history = useHistory();
  const [diaryList, setDiaryList] = useState([]);

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    if (auth.token) getDiaryList();
  }, [auth.token]);

  const getDiaryList = async () => {
    const result = await sendRequest(`http://localhost:5000/common/getDiaries?userType=${auth.userType}`, 'GET', {
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

    setDiaryList(result.data);
  };

  async function onDelete(diaryId, e) {
    e.stopPropagation();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/common/deleteDiaries?userType=${auth.userType}&diary_id=${diaryId}`, 'DELETE', null, config).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    showAlertBox('Diary Deleted!', 2000);

    getDiaryList();
  }

  async function onEdit(diaryId, heading, body, date, e) {
    e.stopPropagation();
    history.push(`diary/edit/${diaryId}`);
  }

  return (

    <>
      <div className="diary-list">
        <button type="button" className="create-diary-button" onClick={() => history.push('diary/create')}>Create New + </button>
        {
          diaryList.map((item) => (
            <DiaryListItem
              key={item.diary_id}
              heading={item.title}
              body={item.body}
              date={item.date_created}
              onDelete={(e) => onDelete(item.diary_id, e)}
              onEdit={(e) => onEdit(item.diary_id, item.title, item.body, item.date_created, e)}
            />
          ))
        }
      </div>

    </>

  );
}
