import './StaffAttendance.css';
import { useState, useEffect } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import ClassAttendance from '../../../components/Staff/ClassAttendance';

const StaffAttendance = () => {
    const [attRecord, setAttRecord] = useState([]);
    const { sendRequest } = useHttpClient();
    const user = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        getAttendanceRecords();
    }, [])

    const getAttendanceRecords = async () => {
        const params = {
            module_id: user.module_id,
            isActive: false
        }
        const result = await sendRequest("http://localhost:5000/staff/getAllAttendanceRecords", "GET", { params }, null);
        setAttRecord(result.data);
    }


    return (
        <>
            <div className="attendanceBody">
                <div className="heading">Records</div>
                {attRecord.map((item) => {
                    const dateOfAtt = new Date(item.attendance_time);
                    const date = dateOfAtt.getDate() + "-" + (parseInt(dateOfAtt.getMonth()) + 1) + "-" + dateOfAtt.getFullYear();
                    return <ClassAttendance key={item.attendance_modules_id} module_name={item.module_name} week={item.week} totalStudents={item.totalStudents} date={date} />
                })}

            </div>

        </>
    )
};

export default StaffAttendance;