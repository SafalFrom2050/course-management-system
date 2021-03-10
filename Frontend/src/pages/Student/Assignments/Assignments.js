import "./assignments.css"
import React, {useState, useEffect} from 'react'
import AssignmentItem from '../../../components/Student/Assignment/AssignmentItem'

import { useHttpClient } from '../../../hooks/http-hook'
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext'


export default function Assignments(){

    const { sendRequest } = useHttpClient()
    const user = JSON.parse(localStorage.getItem("userData"))

    const [assignmentList, setAssigmentList] = useState([])

    const showAlertBox = useAlertBoxShowMsg()


    useEffect(() => {
        getAssignmentList()
    }, [])

    async function getAssignmentList(){
        const result = await sendRequest(`http://localhost:5000/student/assignment/?id=${user.student_id}`, "GET", null, null).catch((error)=>{
            showAlertBox("Network error! Please try again later...", 2000)
        })
        
        if (!result) { 
            return; 
        }
        setAssigmentList(result.data)
    }

    return(
        <>
            {assignmentList.map((assignment)=>{
                return (
                    <AssignmentItem 
                        key = {assignment.assignment_id} 
                        heading = {"Heading/Module ID: " + assignment.module_id}
                        body = {assignment.content}
                        deadline = {assignment.deadline}
                        >
                    </AssignmentItem>
                )

            })}
            
        </>
    )

}