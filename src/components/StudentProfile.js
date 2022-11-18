import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const findStudentProfile = (studentName, dataSet) => {
    const [student] = dataSet.filter((item) => {
        return studentName === item.name
    })
    return student
}

const StudentProfile = ({ data, isLoading, constructChosenStudentList }) => {
    const name = useParams().student
    const student = findStudentProfile(name, data)

    useEffect(() => { 
        constructChosenStudentList(name)

        return () => {
            constructChosenStudentList()
        }
    }, [])

    if (!isLoading){
        return (
            <div className="student-profile">
                <div className="back-button">
                    <Link to="..">Terug naar Overzicht</Link>
                </div>
                <div className="profile">
                    <div>
                        <img className="profile-pic" src={student.profile_pic} />
                    </div>
                    <div>
                        <p>
                            Naam: {`${student.name} ${student.last_name}`}<br />
                            Leeftijd: {`${student.age}`}<br />
                            Telefoon: {`${student.phone}`}<br />
                            E-mail: {`${student.email}`}
                        </p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default StudentProfile