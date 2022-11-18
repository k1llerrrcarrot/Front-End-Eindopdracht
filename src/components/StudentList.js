import React from "react"
import { Link } from "react-router-dom"

const StudentList = ({ nameList }) => {
    return (
        <div className="student-list">
            <ul>
                {
                    nameList.map(student => {
                        return (
                            <li key={nameList.indexOf(student)}>
                                <Link to={student}>{student}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default StudentList