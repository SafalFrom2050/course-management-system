import './StaffAttendance.css';
import { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import ClassAttendance from '../../../components/Staff/ClassAttendance';
import PostAttendance from '../../../components/Staff/PostAttendance';
import Modal from '../../../components/Shared/Modal';
import { AuthContext } from '../../../contexts/AuthContext';

const StaffAttendance = () => {
    const [activeAtt, setActiveAtt] = useState([]);
    const [attRecord, setAttRecord] = useState([]);
    const [modal, setModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [moduleName, setModuleName] = useState("Loading...");
    const [post, setPost] = useState({
        semester: null,
        week: null,
        date: null,
    })

    const { sendRequest } = useHttpClient();
    const user = JSON.parse(localStorage.getItem("userData"));
    const auth = useContext(AuthContext);

    useEffect(() => {
        getActiveAttendance();
        getAttendanceRecords();
    }, [])

    const getActiveAttendance = async () => {
        const params = {
            module_id: user.module_id,
            isActive: true
        }
        const name = await sendRequest("http://localhost:5000/staff/getModuleName", "GET", {
            params, headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }, null);
        setModuleName(name.data.module_name);
        const result = await sendRequest("http://localhost:5000/staff/getAllAttendanceRecords", "GET", {
            params, headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }, null);
        setActiveAtt(result.data);
    }

    const getAttendanceRecords = async () => {
        const params = {
            module_id: user.module_id,
            isActive: false
        }
        const result = await sendRequest("http://localhost:5000/staff/getAllAttendanceRecords", "GET", {
            params, headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }, null);
        setAttRecord(result.data);
    }

    const stopAttendance = async (attendance_modules_id) => {
        const payload = {
            attendance_modules_id
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + user.token
            }
        }
        await sendRequest("http://localhost:5000/staff/deactivateAttendance", "POST", payload, config);
        setAttRecord(prevState => {
            const array = [...prevState];
            array.push(...activeAtt);
            return array;
        })
        setActiveAtt([]);
    }

    const setSemester = (e) => {
        setPost({
            ...post,
            semester: e.target.value
        })
    }

    const setWeek = (e) => {
        setPost({
            ...post,
            week: e.target.value
        })
    }

    const setDate = (e) => {
        setPost({
            ...post,
            date: e.target.value
        })
    }

    const postAttendance = async () => {
        const semester = post.semester;
        const week = post.week;
        const attendance_time = post.date;
        if (!attendance_time || !semester || !week) {
            return;
        }
        const obj = {
            module_id: user.module_id,
            attendance_time,
            semester,
            week,
            class_type: "Lecture"
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
        }
        const res = await sendRequest("http://localhost:5000/staff/activateAttendance", "POST", obj, config);
        if (!res) { return; }
        const attendance_modules_id = res.data.attendance_modules_id;
        const newAtt = {
            attendance_modules_id,
            module_name: moduleName,
            attendance_time,
            week,
            totalStudents: 0
        }
        setActiveAtt(prevState => {
            const array = [...prevState];
            array.unshift(newAtt);
            return array;
        });
    }

    const closeModalHandler = () => {
        setModal(false);
    }

    const viewStudents = async (attendance_modules_id) => {
        const result = await sendRequest(`http://localhost:5000/staff/getAllPresentStudents/${attendance_modules_id}`, "GET", {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        }, null);
        setStudents(result.data);
        setModal(true);
    }

    return (
        <>
            <div className="attendanceBody">
                {modal ? <Modal show={modal} hide={closeModalHandler} message="List of present students" students={students} /> : null}

                {activeAtt.length === 0 ? <PostAttendance module_name={moduleName}
                    semHandler={setSemester}
                    weekHandler={setWeek}
                    dateHandler={setDate}
                    postHandler={postAttendance} /> : null}

                {activeAtt.length > 0 ? <h2 className="heading">Active Attendance | Recording!</h2> : null}

                {activeAtt.map((item) => {
                    const dateOfAtt = new Date(item.attendance_time);
                    const date = dateOfAtt.getDate() + "-" + (parseInt(dateOfAtt.getMonth()) + 1) + "-" + dateOfAtt.getFullYear();
                    return <ClassAttendance
                        key={item.attendance_modules_id}
                        module_name={item.module_name}
                        week={item.week}
                        totalStudents={item.totalStudents} date={date}
                        current
                        handler={() => {
                            stopAttendance(item.attendance_modules_id);
                        }} />
                })}

                <h3 className="heading">Records</h3>
                {attRecord.map((item) => {
                    const dateOfAtt = new Date(item.attendance_time);
                    const date = dateOfAtt.getDate() + "-" + (parseInt(dateOfAtt.getMonth()) + 1) + "-" + dateOfAtt.getFullYear();
                    return <ClassAttendance
                        key={item.attendance_modules_id}
                        module_name={item.module_name}
                        week={item.week}
                        totalStudents={item.totalStudents}
                        date={date}
                        handler={() => {
                            viewStudents(item.attendance_modules_id);
                        }} />
                })}

            </div>

        </>
    )
};

export default StaffAttendance;