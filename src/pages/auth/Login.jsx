import './login.css';
import {Outlet, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import profile from './profile3.jpg';

function Login() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const isValidEmail = (email) => {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const handleLogin = (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token')
      fetch('https://eclectics-project-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({username, password})
      })
      .then((res)=>{
        if (!res.ok) throw new Error('Invalid user')
          return res.json();
      })
      .then((data)=>{

        const userData = data.Data; 

        localStorage.setItem('token', userData.token);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('role', userData.role);

        const role = userData.role?.toUpperCase();

        if(role === 'ROLE_ADMIN'){
          navigate('/dashboard/default');
        }
        else if(role === 'ROLE_LECTURER'){
          navigate('/lecturer');
        }else{
          alert('Unathorized role');
        }
      })
      .catch((err)=>{
        console.error(err.message);
        alert('Check Your Username or Password');
      })


    }
 
    const [rememberMe, setRememberMe] = useState(false);
  return (
    <Outlet>
    <div className='login-page'>
        <div className="top-login">
           <img src={profile}></img>
           <h2>Sign In</h2>
        </div>
        <div className="inputs">
            
                <input type='email' placeholder='Enter your username'value={username} onChange={(e) => setUsername(e.target.value)}></input>
          
            
                <input type='password' placeholder='Enter your password'value={password}onChange={(e) => setPassword(e.target.value)}></input>
          
        </div>
       
        <button id='login-btn'onClick={handleLogin}>Login</button>
        
    </div>
    </Outlet>
  )
}

export default Login