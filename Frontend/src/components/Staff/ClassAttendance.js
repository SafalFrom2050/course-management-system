function ClassAttendance(props) {

    return <div className="class-attendance-item">
        <div className="class-detail">
            <div className="class-heading">{props.module_name}</div>

            <div className="attendance-details-container">
                <div className="data-container">
                    <div className="data-label data-label-focus">
                        Present Students:
                <label className="data">{props.totalStudents}</label>
                    </div>
                    <br />
                    <div className="data-label">
                        Week :
                <label className="data">{props.week}</label>
                    </div>
                    <div className="data-label">
                        Date:
                <label className="data">{props.date}</label>
                    </div>
                </div>

                <button className="view-students-btn" type="submit" onClick={props.handler}>
                    {props.current ? "Stop" : "View Students"}
                </button>
            </div>
        </div>
    </div>
}

export default ClassAttendance;