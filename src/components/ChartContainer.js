import { React, useState } from "react"
import ChartDisplay from "./ChartDisplay"
import ChartControls from "./ChartControls"

const retrieveUniqueAssignments = (data) => {
    const arrayOfUniqueValues = data.map((item) => {
        return item.assignment
    }).filter((value, index, self) => {
        return self.indexOf(value) === index
    })
    return arrayOfUniqueValues
}

const makeFilteredDataset = (data, filterArray) => {
    let filteredDataset = data.filter((item) => {
        return filterArray.includes(item.studentName)
    })

    if (filterArray.length > 1) { // Calculates averages if more than one student is chosen
        const assignmentArray = retrieveUniqueAssignments(filteredDataset)

        filteredDataset = assignmentArray.map((assignment) => {
            const perAssignmentArray = filteredDataset.filter((item) => {
                return item.assignment === assignment
            })
            const enjoymentRating = (perAssignmentArray.reduce((currentTotal, item) => {
                return item.enjoymentRating + currentTotal
            }, 0) / filterArray.length)
            const difficultyRating = (perAssignmentArray.reduce((currentTotal, item) => {
                return item.difficultyRating + currentTotal
            }, 0) / filterArray.length)
            return {assignment, enjoymentRating, difficultyRating}
        });
    }

    return filteredDataset
}

const sortByKey = (key) => { 
    return function (a, b) {
        return (a[key] - b[key])
    }  
}

const currentDataLabel = (currentStudents, allStudents) => {
    if (currentStudents.length === 1) {
        return "data van " + currentStudents
    } else if (currentStudents.length === allStudents.length) {
        return "gemiddelden van alle studenten"
    } else {
        return "gemiddelden van meerdere studenten"
    }
}

const ChartContainer = ({ data, chosenStudents, nameList }) => {
    const [showData, setShowData] = useState({
        difficultyRating: true,
        enjoymentRating: true
    })
    const [sortType, setSortType] = useState("none")

    const filteredDataset = makeFilteredDataset(data, chosenStudents)
    const dataShown = currentDataLabel(chosenStudents, nameList)

    const handleFilterChange = (event) => {
        setShowData({...showData, [event.target.name]: event.target.checked})
    }

    const handleSortChange = (event) => {
        setSortType(event.target.value)
    }
    
    let sortedDataset = filteredDataset

    switch (sortType) {
        case "enjoyAsc":
            sortedDataset = sortedDataset.sort(sortByKey("enjoymentRating"))
            break;
        case "enjoyDesc":
            sortedDataset = sortedDataset.sort(sortByKey("enjoymentRating")).reverse()
            break;
        case "difficultyAsc":
            sortedDataset = sortedDataset.sort(sortByKey("difficultyRating"))
            break;
    
        case "difficultyDesc":
            sortedDataset = sortedDataset.sort(sortByKey("difficultyRating")).reverse()
            break;
        default:
            break;
    }

    if(sortedDataset) {
        return (
            <div>
                <ChartControls 
                    handleFilterChange={handleFilterChange}
                    handleSortChange={handleSortChange}
                    showEnjoyment={showData.enjoymentRating}
                    showDifficulty={showData.difficultyRating}
                    sortType={sortType}
                />
                <p>De grafiek toont {dataShown}</p>
                <ChartDisplay 
                    data={sortedDataset}
                    showEnjoyment={showData.enjoymentRating}
                    showDifficulty={showData.difficultyRating}
                />
            </div>
        )
    }
}
  
export default ChartContainer