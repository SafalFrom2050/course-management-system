import React, { useState } from 'react'


/*
    props.heading
    props.body
    props.date
    props.selected
    props.onSelect
    props.onEdit
*/
export default function DiaryListItem(props){

    const [fullTextView, setFullTextView] = useState(false);

    function toggleFullTextView(){
        setFullTextView(prevFullTextView => !prevFullTextView);
    }

    return(
        <div className="diary-item">
            {/* <!-- Diary Detail, Active Item! --> */}
            <div className={`diary-detail ${fullTextView === true ? 'diary-detail-full-text' : ''}`}  onClick={toggleFullTextView}>
            <div className="diary-heading">{props.heading}</div>

            {/* <!-- Body information container --> */}
            <div className="body-container">
                <div className="body">
                {props.body}

                </div>
                <div className="data-label">
                <label className="data">
                    {
                        props.date.split("T",1)
                    }
                </label>
                </div>

                {/* <!-- Edit diary, only for active item --> */}
                <button className="edit-diary-btn" onClick={props.onEdit} type="submit">Edit</button>
            </div>
            </div>
        </div>
    )
}