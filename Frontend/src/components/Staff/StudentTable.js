import './StudentTable.css'
const StudentTable = (props) => {
    return <table>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Attendance Time</th>
        </tr>
        {props.students.map((item => {
            const time = new Date(item.attendance_time);
            const date = time.toUTCString();
            return <tr>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.email}</td>
                <td>{date}</td>
            </tr>
        }))}

    </table>
}

export default StudentTable;

