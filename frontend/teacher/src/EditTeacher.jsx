import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditTeacher() {
	const [data, setData] = useState({
		name: '',
		email: '',
        phone: '',
		address: '',
		salary: '',
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:8080/get/'+id)
		.then(res => {
			setData({...data, name: res.data.Result[0].name,
				email: res.data.Result[0].email,
                phone: res.data.Result[0].phone,
				address: res.data.Result[0].address,
				salary: res.data.Result[0].salary
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8080/update/'+id, data)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/teacher')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
			<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder=' Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder=' Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				
                <div className="col-12">
					<label htmlFor="inputPhone" className="form-label">Phone</label>
					<input type="phone" className="form-control" id="inputPhone" placeholder=' Phone' autoComplete='off'
					onChange={e => setData({...data, phone: e.target.value})} value={data.phone}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Update Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})} value={data.salary}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditTeacher