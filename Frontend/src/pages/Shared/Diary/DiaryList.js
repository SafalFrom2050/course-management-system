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
  const { sendRequest, error } = useHttpClient();
  const auth = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('userData'));

  const history = useHistory();
  const [diaryList, setDiaryList] = useState([]);

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    getDiaryList();
  }, []);
  const getDiaryList = async () => {
    const result = await sendRequest(`http://localhost:5000/common/getDiaries?userType=${user.userType}`, 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    setDiaryList(result.data);
  };

  async function onEdit(diaryId) {
    // TODO
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
                        onEdit={() => { onEdit(item.diary_id); }}
                      />
                    ))
                }
      </div>

    </>

  );
}
