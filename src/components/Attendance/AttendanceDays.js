
function AttendanceDays(props) {
    let className = "day-mark-item";
    if (props.present) {
        className = className + " present";
    }
    return <div className={className}>{props.number > 0 ? props.number : null}</div>
}
export default AttendanceDays;