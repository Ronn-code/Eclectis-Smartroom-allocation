import './login.css';
import {useNavigate} from 'react-router-dom';
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
    <div className='login-page' style={{
            display: 'flex',
            width:'90%',
            marginTop:'6rem',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '70vh',
            padding: '20px',
            boxSizing: 'border-box'}}>
      <div className="top-login" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px',
            textAlign: 'center'}}>
        <img src={profile} alt="Profile" 
              style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: '15px'}} ></img>
        <h2  style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    color: '#333'}}>Sign In</h2>
      </div>
        <div className="inputs"  style={{
                width: '90%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '16px',
                marginLeft:'10px'}}>
          <input type='email' placeholder='Enter your username'value={username} onChange={(e) => setUsername(e.target.value)} style={{
                  width: '100%',
                  padding: '24px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box'}}>
          </input>
          <input type='password' placeholder='Enter your password'value={password}onChange={(e) => setPassword(e.target.value)} style={{
                  width: '100%',
                  padding: '24px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box'}}>
          </input>
        </div>
        <button id='login-btn'onClick={handleLogin} style={{
                    width: '90%',
                    height:'2.6rem',
                    maxWidth: '400px',
                    padding: '1px ',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'rgb(1,97,46)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginLeft:'10px',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: 'rgb(0,80,38)'}}}>Login
        </button>
      </div>
    )
  }

export default Login