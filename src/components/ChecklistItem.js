import React from "react"


const ChecklistItem = ({ name, handleCheckboxChange, chosenStudents }) => {
    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    value={name}
                    checked={chosenStudents.includes(name)}
                    onChange={handleCheckboxChange}
                />{name}
            </label>
        </li>
    )
}

export default ChecklistItem