import './createDiary.css';
import { useState, useContext } from 'react'
import { useHttpClient } from '../../../hooks/http-hook'
import {useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { useHistory } from "react-router-dom"

export default function CreateDiary(){
    const { sendRequest } = useHttpClient()
    const user = JSON.parse(localStorage.getItem("userData"))

    const [diaryBody, setDiaryBody] = useState("")
    const [diaryHeading, setDiaryHeading] = useState("")

    // Date to set for future
    const [date, setDate] = useState(()=> {return new Date().toISOString().replace('T', ' ').split('Z')[0]})

    const showAlertBox = useAlertBoxShowMsg();

    const history = useHistory();


    // Creates a diary with date property set to current system date
    async function createDiary(e){
        e.preventDefault()

        const payload = {
            id: user.student_id,
            title:diaryHeading,
            body:diaryBody
        }

        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const result = await sendRequest(`http://localhost:5000/student/setDiaries`, "POST", payload, config);
        if (!result) { return; }

        showAlertBox("Diary Created!", 2000)

        history.push("/diary")
    }

    async function onEdit(diary_id){
        
     
    }

    return(

        <>
            <div className="diary-create-box">
                <div className="create-diary-label">Create New +</div>

                {/* <!-- Diary Form -->

                <!-- Diary Form 
                    > Diary Detail
                        > diary Heading, Date Label, Body
                            > Body, Data Label 
                                > Edit Diary Button -->

                <!-- Diary Item Without Full Text--> */}

                <div className="diary-form">
                    {/* <!-- Diary Detail --> */}
                    <div className="diary-detail">
                        <form onSubmit={createDiary}>
                            <input
                                className="diary-heading"
                                type="text"
                                name=""
                                id=""
                                placeholder="Heading..."
                                required = "true"
                                onChange={e=> setDiaryHeading(e.target.value)}
                            />
                            <label className="diary-date" for="">{date.split(" ")[0]}</label>
                            <textarea 
                                className="diary-body" 
                                name="diary-body" 
                                id="" 
                                cols="60" 
                                rows="10"
                                required = {true}
                                onChange={e=> setDiaryBody(e.target.value)}>
                            </textarea>

                            {/* <!-- Save diary --> */}
                            <button className="save-diary-btn" type="submit">Save</button>
                        </form>      
                    </div>
                </div>
            </div>   
                  
        </>

    )
}