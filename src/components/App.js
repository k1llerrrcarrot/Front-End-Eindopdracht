import { useEffect, useState } from 'react';
import './App.css';
import { usePapaParse } from 'react-papaparse'


import studentCSV from "../data/studentRatings.csv"
import ChartContainer from './ChartContainer';
import StudentSelection from './StudentSelection';
import Header from './Header';

const listNames = (data) => { //Returns array with only the students names
  const nameList = data.map(item => item.name)
  return nameList
}

const App = () => {
  const { readRemoteFile } = usePapaParse()

  const [studentRatings, setStudentRatings] = useState([])
  const [studentProfiles, setStudentProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [chosenStudents, setChosenStudents] = useState([])
  
  const getStudentProfiles = () => {
    console.log("fetching data from API...")
    fetch("https://my.api.mockaroo.com/student_profile.json?key=a2384d50")
    .then(response => response.json())
    .then(data => {
      setStudentProfiles(data)
      setIsLoading(false)
      console.log("Data retrieved")
    })
  }

  const parseRatingsFile = () => {
    readRemoteFile(studentCSV, {
      header: true,
      dynamicTyping: true,
      transformHeader: (h) => {
        switch (h) {
          case "Wie ben je?":
            return "studentName"
          case "Welke opdracht of welk project lever je nu in?":
            return "assignment"
          case "Hoe moeilijk vond je deze opdracht?":
            return "difficultyRating"
          default:
            return "enjoymentRating"
        }
      },
      complete: results => {
        setStudentRatings(results.data)
      }
    })
  }

  const constructChosenStudentList = (studentName) => {
    if (studentName) {
      setChosenStudents([studentName])
    } else {
      setChosenStudents(listNames(studentProfiles))
    }
  }

  const handleCheckboxChange = (event) => {
    let newChosenList = [...chosenStudents]
    if (event.target.checked) {
      newChosenList = [...chosenStudents, event.target.value]
    } else {
      newChosenList.splice(newChosenList.indexOf(event.target.value), 1)
    }
    setChosenStudents(newChosenList)
  }

  useEffect(() => { // On mounting of component
    getStudentProfiles()
    parseRatingsFile()
  }, [])

  return (
    <div className="App">
      <Header />
      <main>
        {isLoading ? 
          <p>Retrieving Data...</p> : 
          <div>
            <StudentSelection 
              data={studentProfiles} 
              isLoading={isLoading}
              nameList={listNames(studentProfiles)}
              constructChosenStudentList={constructChosenStudentList}
              handleCheckboxChange={handleCheckboxChange}
              chosenStudents={chosenStudents}
            />

            <ChartContainer 
              data={studentRatings}
              nameList={listNames(studentProfiles)}
              chosenStudents={chosenStudents}
            />
          </div>
        }     
      </main>
    </div>
  );
}

export default App;
