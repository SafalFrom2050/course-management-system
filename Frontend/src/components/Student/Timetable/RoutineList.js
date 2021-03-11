function RoutineList(props) {
    return (
        <div className="class-item">
            <div className="first-row">
                <div className="title">{props.module_name}</div>
                <div className="tutor">By {props.name + " " + props.surname}</div>
            </div>

            <div className="second-row">
                <label>Start Time</label>
                <div className="start-time">{props.start_time}</div>
                <label>End Time</label>
                <div className="end-time">{props.end_time}</div>
                {props.semester ? <>
                    <label>Sem</label>
                    <div className="end-time">{props.semester}</div></> : null}

            </div>
        </div>
    )
}

export default RoutineList;