import React from "react"
import ChecklistItem from "./ChecklistItem"


const StudentChecklist = ({ isLoading, nameList, handleCheckboxChange, chosenStudents }) => {

    if (!isLoading) {
        return (
            <div className="student-list multi-list">
                <ul>
                    {nameList.map(item => {
                        return <ChecklistItem 
                                    key={nameList.indexOf(item)}
                                    name={item} 
                                    handleCheckboxChange={handleCheckboxChange}
                                    chosenStudents={chosenStudents}
                                />
                    })}
                </ul>
            </div>
        )
    }
}

export default StudentChecklist