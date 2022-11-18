import React from "react"
import { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import StudentList from "./StudentList";
import StudentProfile from "./StudentProfile";
import StudentChecklist from "./StudentChecklist";

const StudentSelection = ({ 
    data, 
    isLoading, 
    constructChosenStudentList,
    nameList, 
    handleCheckboxChange, 
    chosenStudents 
}) => {
    const [checkMultiple, setCheckMultiple] = useState(false)

    const navigate = useNavigate()

    const onTabClickHandler = (event) => {
        const clickedTab = event.target.attributes.name.value
        if (clickedTab === "single") {
            setCheckMultiple(false)
        } else {
            setCheckMultiple(true)
            navigate("..")
        }
    }

    const studentListProfiles = (
        <Routes>
            <Route 
                path="/" 
                element={
                    <StudentList 
                        data={data} 
                        nameList={nameList} 
                    />
                } 
            />
            <Route 
                path="/:student" 
                element={
                    <StudentProfile 
                        data={data} 
                        isLoading={isLoading} 
                        constructChosenStudentList={constructChosenStudentList} 
                    />
                } 
            />
        </Routes>
    )
    
    useEffect(() => {
        constructChosenStudentList()
    }, [])

    return (
        <div className="list-container">
            <div className="tabs">
                <div className="single-tab" onClick={onTabClickHandler}>
                    <h2 name="single">Enkele student</h2>
                </div>
                <div className="multi-tab" onClick={onTabClickHandler}>
                    <h2 name="multi">Meerdere studenten</h2>
                </div>
            </div>

            <div className="student-list-wrapper">
                {!checkMultiple ? 
                    studentListProfiles : 
                    <StudentChecklist 
                        nameList={nameList} 
                        isLoading={isLoading}
                        handleCheckboxChange={handleCheckboxChange}
                        chosenStudents={chosenStudents}
                    />
                }
            </div>
        </div>
    )
}

export default StudentSelection