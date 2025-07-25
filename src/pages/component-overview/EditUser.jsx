import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

function EditUser() {

const [department, setDepartment] = useState('');
const [role, setRole] = useState('');
const [fullName, setFullName] = useState('');
const navigate = useNavigate('');

const {userid} = useParams();

useEffect(()=>{

    const token = localStorage.getItem('token')
    fetch('https://eclectics-project-production.up.railway.app/api/users/'+userid,{
      headers:{
         "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error('Failed to fetch user details');
      }
      return res.json();
    })
    .then((data)=>{
      const user = data.Data;
      setRole(user.role);
      setDepartment(user.department);
      setFullName(user.fullName)
    })
    .catch((err)=>{
      console.log(err.message);
    })
},[userid]);

const handleSubmit = (e) =>{
  e.preventDefault();

  const users = { department, role, fullName};
  const token = localStorage.getItem('token')
  fetch('https://eclectics-project-production.up.railway.app/api/users/'+userid,{
    method: 'PUT',
    headers: {
      "content-type" : "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(users)
  })
  .then((res)=>{
    alert("User Details Updated Successfully");
    navigate('/user', { replace: true });
  })
  .catch((err)=>console.log(err.message))
}

const handleBack = ()=>{
    navigate('/user')
}



  return (
    <MainCard title="Edit User">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(4, 1fr)', 
                                              gridTemplateRows: 'repeat(2, auto)',
                                              gap:'1rem'}}>
            <div className="department"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='department'>Department</label>
                <input type='text'
                   id='department'
                   value={department || ''}
                   onChange={(e)=>setDepartment(e.target.value)}
                   placeholder='Education'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="role"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='role'>Role</label>
                <select
                   id='role'
                   value={role}
                   onChange={(e)=>setRole(e.target.value)}
                   style={{height:'2rem',width:'12rem'}}>
                    <option value='' disabled>Select Role</option>
                    <option value='LECTURER'>LECTURER</option>
                    <option value='ADMIN'>ADMIN</option>
                </select>
            </div>
            <div className="fullname"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='fullname'>Full name</label>
                <input type='text'
                   id='fullname'
                   value={fullName || ''}
                   onChange={(e)=>setFullName(e.target.value)}
                   placeholder='Lecturer'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
        </div>
        <div className="btns"style={{display:'flex',gap:'2rem'}}>
            <button id='add' onClick={handleSubmit}
                style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem',borderRadius:'10px'}}>Update</button>
            <button id='back'onClick={handleBack} style={{height:'2rem',width:'12rem',
            background:'rgb(90, 7, 7)',color:'#ececec',border:'none',marginTop:'2rem',borderRadius:'10px'}}>Back</button>       
        </div>
    </MainCard>
    
    
        
      
  )
}

export default EditUser
