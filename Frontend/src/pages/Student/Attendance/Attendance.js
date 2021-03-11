import './Attendance.css';
import { React, useState, useEffect } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import AttendanceDetail from '../../../components/Student/Attendance/AttendanceDetail';
import ActiveAttendance from '../../../components/Student/Attendance/ActiveAttendance';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

const Attendance = () => {
  const { sendRequest } = useHttpClient();
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState([]);
  const user = JSON.parse(localStorage.getItem('userData'));

  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    downloadAttendance();
    downloadActiveAttendance();
  }, []);

  const downloadAttendance = async () => {
    const result = await sendRequest(`http://localhost:5000/student/getAttendanceStatus/${user.student_id}`, 'GET', null, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setAttendance(result.data);
  };

  const downloadActiveAttendance = async () => {
    const result = await sendRequest(`http://localhost:5000/student/attendance/${user.student_id}`, 'GET', null, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setNewAttendance(result.data);
  };

  const submitAssignment = async (attendance_module_id, module_name, week) => {
    const payload = {
      attendance_module_id,
      student_id: user.student_id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await sendRequest('http://localhost:5000/student/submitAttendance', 'POST', payload, config).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });

    if (!result) {
      return;
    }

    const obj = attendance.find((item) => item.module_name === module_name);
    obj.attendance_status[week] = 1;
    setNewAttendance([]);
  };

  return (
    <>
      <div className="attendanceBody">
        {newAttendance.map((item) => {
          const date = new Date(item.attendance_time);
          const post = parseInt(date.getHours()) > 12 ? 'PM' : 'AM';
          const minutes = date.getMinutes() + ''.length > 1 ? date.getMinutes() : `0${date.getMinutes()}`;
          const hours = date.getHours() + ''.length > 1 ? date.getHours() : `0${date.getHours()}`;
          const time = `${hours}:${minutes} ${post}`;
          return <ActiveAttendance key={time} click={() => { submitAssignment(item.attendance_modules_id, item.module_name, item.week); }} time={time} module_name={item.module_name} week={item.week} />;
        })}

        <div className="heading">Other Classes</div>
        {attendance.map((item) => <AttendanceDetail key={item.module_name} module_name={item.module_name} attendance_status={item.attendance_status} />)}
      </div>

    </>
  );
};

export default Attendance;
