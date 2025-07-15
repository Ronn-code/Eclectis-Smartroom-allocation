import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

function AddUser() {


const [fullName, setName] = useState('');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [department, setDepartment] = useState('');
const [role, setRole] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate('');

const handleSubmit = (e) =>{
  e.preventDefault();

  const token = localStorage.getItem('token');
  const users = {fullName, username, email, department, role,password};
  console.log(users);
  console.log(localStorage.getItem('token'));

  fetch('https://eclectics-project-production.up.railway.app/api/users/register',{
    method: 'POST',
    headers: {
      "content-type" : "application/json",
      'Authorization': `Bearer ${token}`
      
    },
    body: JSON.stringify(users)
  })
  .then(async(res)=>{
    if(!res.ok){
      const errorData = await res.json().catch(()=>({}));
      console.error('failed to add user:', errorData);
      throw new Error(`Failed to add user: ${res.status}`);
    }
    return res.json();
  })
  .then((data)=>{
    alert("New User Added Successfully");
    navigate('/dashboard/default');
    window.location.reload();
  })
  .catch((err)=>console.log(err.message))
}




  return (
    <MainCard title="Add New User">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)',
                                              gap:'1rem'}}>
            <div className="name" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='name'>Full Name</label>
                <input type='text'
                   id='name'
                   value={fullName}
                   onChange={(e)=>setName(e.target.value)}
                   placeholder='John Doe'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="username" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='username'>Username</label>
                <input type='text'
                   id='username'
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}
                   placeholder='Doe'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="email"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='email'>Email</label>
                <input type='text'
                   id='email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   placeholder='example@example.com'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="department"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='department'>Department</label>
                <input type='text'
                   id='department'
                   value={department}
                   onChange={(e)=>setDepartment(e.target.value)}
                   placeholder='Education'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="role"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='role'>Role</label>
                <input type='text'
                   id='role'
                   value={role}
                   onChange={(e)=>setRole(e.target.value)}
                   placeholder='Lecturer'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="role"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='pwd'>Password</label>
                <input type='password'
                   id='pwd'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   placeholder='***********'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            
        </div>
        <button id='add' onClick={handleSubmit}
                style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem'}}>Add User</button>
    </MainCard>
    
    
        
      
  )
}

export default AddUser
