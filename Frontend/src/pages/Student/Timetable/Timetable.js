import './Timetable.css';
import { React, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import RoutineList from '../../../components/Student/Timetable/RoutineList';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

function Timetable() {
  const [routine, setRoutine] = useState([]);
  const [activeBtn, setActiveBtn] = useState('Sunday');
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const location = useLocation().search;

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    const day = new URLSearchParams(location).get('day');
    day ? downloadRoutine(day) : downloadRoutine('Sunday');
    day ? setActiveBtn(day) : setActiveBtn('Sunday');
  }, []);

  const downloadRoutine = async (day) => {
    const user = JSON.parse(localStorage.getItem('userData'));
    const params = {
      day,
    };
    const result = await sendRequest(`http://localhost:5000/${user.userType === 'student' ? 'student' : 'staff'}/routine`, 'GET', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setRoutine(result.data);
  };

  const buttonClickHandler = (day) => {
    setActiveBtn(day);
    history.push({
      pathname: '/timetable',
      search: `day=${day}`,
    });
    downloadRoutine(day);
  };

  return (
    <>
      <div className="timetable-container">

        <div className="class-information">
          <div className="heading">Classes</div>

          <div className="class-list">
            {routine.map((item) => (
              <RoutineList
                module_name={item.module_name}
                name={item.name}
                surname={item.surname}
                start_time={item.start_time}
                end_time={item.end_time}
                semester={item.semester}
                key={item.start_time + item.name}
              />
            ))}
          </div>
        </div>

        <div className="days-selector">
          <div className="heading">Days</div>
          <div className="days-button-list">
            <button
              type="button"
              className={activeBtn === 'Sunday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Sunday'); }}
            >
              Sunday
            </button>
            <button
              type="button"
              className={activeBtn === 'Monday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Monday'); }}
            >
              Monday
            </button>
            <button
              type="button"
              className={activeBtn === 'Tuesday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Tuesday'); }}
            >
              Tuesday
            </button>
            <button
              type="button"
              className={activeBtn === 'Wednesday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Wednesday'); }}
            >
              Wednesday
            </button>
            <button
              type="button"
              className={activeBtn === 'Thursday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Thursday'); }}
            >
              Thursday
            </button>
            <button
              type="button"
              className={activeBtn === 'Friday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Friday'); }}
            >
              Friday
            </button>
            <button
              type="button"
              className={activeBtn === 'Saturday' ? 'selected-btn' : null}
              onClick={() => { buttonClickHandler('Saturday'); }}
            >
              Saturday
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Timetable;
