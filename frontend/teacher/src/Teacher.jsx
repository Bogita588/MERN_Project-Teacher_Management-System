import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Teacher() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8080/getTeacher')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

   const handleDelete = (id) => {
    axios.delete('http://localhost:8080/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Teacher List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Teacher</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher, index) => {
              return <tr key={index}>
                  <td>{teacher.name}</td>
                  <td>{
                    <img src={`http://localhost:8080/images/`+teacher.image} alt="" className='employee_image'/>
                    }</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.address}</td>
                  <td>{teacher.salary}</td>
                  <td>
                    <Link to={`/teacherEdit/`+teacher.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button  className='btn btn-sm btn-danger'>delete</button>
                    <button onClick={e => handleDelete(teacher.id)} className='btn btn-sm btn-danger'>delete</button>
                    
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teacher