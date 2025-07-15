
import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {

    const[fullname, setFullName]= useState('');
    const[email, setEmail]= useState('');
    const[role, setRole]= useState('');
    const[username, setUsername]= useState('');
    const Navigate = useNavigate('');

    const isValidEmail = (email) => {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSave = () =>{
        

        if(!isValidEmail(email)) {
            alert(`Enter a valid email`);
            return;
        }
        if(!fullname){
            alert(`Enter your Name`);
            return;
        }
        if(!role){
          alert(`Enter your role`);
          return;
        }
        else{
            alert(`Updated Account details success`);
            Navigate('/')
        }
    }


  return (
    <MainCard title="Edit Profile">
      <div className="settings" style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="input">
          <div className="top-name">
            <h4>Name</h4>
          </div>
          <input type='name'
                 value={fullname}
                 onChange={(e) =>setFullName(e.target.value)}
                 placeholder='John Doe'
                 style={{height: '2.4rem'}}></input>
        </div>
        <div className="input">
          <div className="top-name">
            <h4>Username</h4>
          </div>
          <input type='name'
                 value={username}
                 onChange={(e) =>setUsername(e.target.value)}
                 placeholder='Doe'
                 style={{height: '2.4rem'}}></input>
        </div>
        <div className="input">
          <div className="top-email">
            <h4>Email</h4>
          </div>
          <input type='email'
                 value={email}
                 onChange={(e) =>setEmail(e.target.value)}
                 placeholder='john@example.com'
                 style={{height: '2.4rem'}}></input>
        </div>
        <div className="input">
          <div className="department">
            <h4>Role</h4>
          </div>
          <input type='text'
                 value={role}
                 onChange={(e) =>setRole(e.target.value)}
                 placeholder='Admin'
                 style={{height: '2.4rem'}}></input>
        </div>
      </div>
      <button onClick={handleSave}
              style={{background: 'rgb(7, 90, 46)',
              color:'#ececec',
              height:'2.4rem',
              border: 'none', width:'10rem',
              borderRadius: '4px',
              marginTop: '2rem'}}>Save</button>
    </MainCard>
  );
}
