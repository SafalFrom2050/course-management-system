const ActiveAttendance = (props) => {
    return (
        <div className="class-attendance-item">

            <div className="heading">Current Class: Attendance Required!</div>

            <div className="class-detail class-detail-active">
                <div className="class-heading">{props.module_name}</div>
                <div className="days-container">
                    <p>To be submitted by: <strong>{props.time}</strong> </p>
                    <button className="day-check-btn" onClick={props.click}>Attend</button>
                </div>
            </div>
        </div>
    )
}

export default ActiveAttendance;