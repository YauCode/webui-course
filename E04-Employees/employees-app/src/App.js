/* eslint-disable jsx-a11y/alt-text */

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])

  function Employee(props) {
    return (
      <div className="card">
        <div className="container">
          <img src={props.employee.image}></img>
          <p className="name">{props.employee.lastName} {props.employee.firstName}</p>
          <p className="job">{props.employee.title} @ {props.employee.department}</p>
          <p className="info">{props.employee.email}</p>
          <p className="info">{props.employee.phone}</p>
        </div>
      </div>
    )
  }
  const employeeItems = employees.map((employee, index) =>
    <Employee key={index} employee={employee} />
  );
  return (
    <div className="App">
      <div>
        {employeeItems}
      </div>
    </div>
  );
}

export default App;
