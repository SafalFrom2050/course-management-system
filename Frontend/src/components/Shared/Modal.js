import './Modal.css';
import Backdrop from './Backdrop';
import StudentTable from '../../components/Staff/StudentTable';


const Modal = (props) => {
    return <>
        {props.show && <Backdrop remove={props.hide} />}
        <div className="Modal">
            <section className="containForm">
                <h3>{props.message}</h3>
            </section>
            {props.students.length > 0 ? <StudentTable students={props.students} /> : <p style={{ marginTop: "15px" }}>No attendance record found.</p>}

        </div>
    </>
}

export default Modal;