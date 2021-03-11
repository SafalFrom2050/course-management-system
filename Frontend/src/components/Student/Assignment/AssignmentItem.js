import React, { useState } from 'react'


export default function AssignmentItem(props) {

    /*
        props.assignment_id
        props.heading
        props.body
        props.deadline
    */

    const [fullTextView, setFullTextView] = useState(false)

    function toggleFullTextView() {
        setFullTextView(prevFullTextView => !prevFullTextView);
    }

    return (

        <>

            <div className="assignment-item">
                {/* <!-- Assignment Detail, Active Item! --> */}
                <div className={`assignment-detail ${fullTextView === true ? 'assignment-detail-full-text' : ''}`} onClick={toggleFullTextView}>
                    <div className="assignment-heading">{props.heading}</div>

                    {/* <!-- Body information container --> */}
                    <div className="body-container">
                        <div className="body">
                            {props.body}
                        </div>
                        <div className="data-label">
                            Assignment Due
                                <label className="data">{props.deadline.split("T")[0]}</label>
                        </div>
                    </div>

                    {/* <!-- Create diary, only for active item --> */}
                    {
                        fullTextView === true ? <button className="create-diary-btn" type="submit">Create Diary</button> : ''
                    }

                </div>
            </div>

        </>

    )
}