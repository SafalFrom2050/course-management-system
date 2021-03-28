import './Modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import StudentTable from '../../Staff/StudentTable';

const Modal = (props) => {
  const {
    show, hide, message, students,
  } = props;

  return (
    <>
      {show && <Backdrop remove={hide} />}
      <div className="Modal">
        <section className="containForm">
          <h3>{message}</h3>
        </section>
        {students.length > 0 ? <StudentTable students={students} /> : <p style={{ marginTop: '15px' }}>No attendance record found.</p>}

      </div>
    </>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;
