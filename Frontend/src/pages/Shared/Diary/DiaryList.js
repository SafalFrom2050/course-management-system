import './diaryList.css';
import { useState, useEffect } from 'react'
import { useHttpClient } from '../../../hooks/http-hook'
import { useHistory } from "react-router-dom"

import DiaryListItem from '../../../components/Shared/Diary/DiaryListItem'

export default function DiaryList() {
    const { sendRequest } = useHttpClient();
    const user = JSON.parse(localStorage.getItem("userData"))

    const history = useHistory();
    const [diaryList, setDiaryList] = useState([])

    useEffect(() => {
        getDiaryList()
    }, [])

    const getDiaryList = async () => {
        const result = await sendRequest(`http://localhost:5000/student/getDiaries/${user.student_id}`, "GET", null, null)
        setDiaryList(result.data)
    }

    async function onEdit(diary_id) {
    }

    return (

        <>
            <div className="diary-list">
                <button className="create-diary-button" onClick={() => history.push("diary/create")}>Create New + </button>
                {
                    diaryList.map((item) => {
                        return <DiaryListItem
                            key={item.diary_id}
                            heading={item.title}
                            body={item.body}
                            date={item.date_created}
                            onEdit={() => { onEdit(item.diary_id) }}
                        />
                    })
                }
            </div>

        </>

    )
}