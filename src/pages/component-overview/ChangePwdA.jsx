
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePwdA() {

    const[oldPassword, setOldPassword]= useState('');
    const[newPassword, setNewPassword]= useState('');
    const Navigate = useNavigate();
    
    
    const handleSave = () => {
      const pwd = {oldPassword, newPassword};
      const token = localStorage.getItem('token');
      fetch('https://eclectics-project-production.up.railway.app/api/users/me/password', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
          },
        body: JSON.stringify(pwd)
      })
      .then(res => res.json())
      .then(response => {
        if (response.Status === 1) {
          alert('Password updated successfully');
          Navigate('/');
        } 
        else {
          alert('Failed to update password: ' + response.Message);
        }
      })
      .catch(error => {
        console.error('Error updating password:', error);
          alert('Something went wrong while updating');
      });
    };

  return (
    <MainCard title="Change Password">
      <div className="settings" style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="input">
          <div className="top-name">
            <h4>Old Password</h4>
          </div>
          <input type='password'
                 value={oldPassword}
                 onChange={(e) =>setOldPassword(e.target.value)}
                 placeholder='old password'
                 style={{height: '2.4rem'}}></input>
        </div>
        <div className="input">
          <div className="top-name">
            <h4>New Password</h4>
          </div>
          <input type='password'
                 value={newPassword}
                 onChange={(e) =>setNewPassword(e.target.value)}
                 placeholder='new password'
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
