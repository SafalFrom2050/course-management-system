import './Attendance.css';
import { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import AttendanceDetail from '../../components/Attendance/AttendanceDetail';
import ActiveAttendance from '../../components/Attendance/ActiveAttendance';
const Attendance = () => {
    const { sendRequest } = useHttpClient();
    const [attendance, setAttendance] = useState([]);
    const [newAttendance, setNewAttendance] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        downloadAttendance();
        downloadActiveAttendance();
    }, [])

    const downloadAttendance = async () => {
        const result = await sendRequest(`http://localhost:5000/student/getAttendanceStatus/${user.student_id}`, "GET", null, null);
        setAttendance(result.data);
    }

    const downloadActiveAttendance = async () => {
        const result = await sendRequest(`http://localhost:5000/student/attendance/${user.student_id}`, "GET", null, null);
        setNewAttendance(result.data)
    }

    const submitAssignment = async (attendance_module_id) => {
        const payload = {
            attendance_module_id,
            student_id: user.student_id
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const result = await sendRequest(`http://localhost:5000/student/submitAttendance`, "POST", payload, config);
        if (!result) { return; }
        setNewAttendance([]);
    }

    return (
        <>
            <div className="attendanceBody">
                {newAttendance.map((item) => {
                    const date = new Date(item.attendance_time);
                    let post = parseInt(date.getHours()) > 12 ? "PM" : "AM";
                    let minutes = date.getMinutes() + "".length > 1 ? date.getMinutes() : "0" + date.getMinutes();
                    let hours = date.getHours() + "".length > 1 ? date.getHours() : "0" + date.getHours();
                    let time = hours + ":" + minutes + " " + post;
                    return <ActiveAttendance key={time} click={() => { submitAssignment(item.attendance_modules_id) }} time={time} module_name={item.module_name} week={item.week} />;
                })}

                <div className="heading">Other Classes</div>
                {attendance.map((item) => {
                    return <AttendanceDetail key={item.module_name} module_name={item.module_name} attendance_status={item.attendance_status} />
                })}
            </div>

        </>
    )
};

export default Attendance;