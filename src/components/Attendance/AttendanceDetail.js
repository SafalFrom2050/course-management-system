import AttendanceDays from './AttendanceDays';

function AttendanceDetail(props) {
    let count = 0;
    return (
        <div className="class-attendance-item">
            <div className="class-detail">
                <div className="class-heading">{props.module_name}</div>
                <div className="days-container">
                    <div className="label">Days:</div>

                    <div className="day-marks">
                        {props.attendance_status.map((item, index) => {
                            return <AttendanceDays key={++count} present={!!item} number={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AttendanceDetail;