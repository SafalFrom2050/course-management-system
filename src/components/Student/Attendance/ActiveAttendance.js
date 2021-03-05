const ActiveAttendance = (props) => {
    return (
        <div className="class-attendance-item">

            <div className="heading">Current Class: Attendance Required!</div>

            <div className="class-detail class-detail-active">
                <div className="class-heading">{props.module_name}</div>
                <p style={{ marginTop: "10px" }}><strong>Week {props.week}</strong> </p>
                <div className="days-container" style={{ marginTop: "0" }}>
                    <p>To be submitted by: <strong>{props.time}</strong> </p>
                    <button className="day-check-btn" onClick={props.click}>Attend</button>
                </div>
            </div>
        </div>
    )
}

export default ActiveAttendance;