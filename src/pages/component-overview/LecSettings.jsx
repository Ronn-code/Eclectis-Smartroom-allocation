
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';


export default function LecSettings() {

    const[fullName, setFullName]= useState('');
    const[email, setEmail]= useState('');
    const[role, setRole]= useState('');
    const[username, setUsername]= useState('');
    const Navigate = useNavigate('');

    const isValidEmail = (email) => {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    useEffect(() => {
            const token = localStorage.getItem('token');
            fetch('https://eclectics-project-production.up.railway.app/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                const user = data.Data; 
                setFullName(user.fullName || '')
            })
            .catch(err => console.error(err));
        }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('https://eclectics-project-production.up.railway.app/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            const user = data.Data; 
            setFullName(user.fullName || '');
            setEmail(user.email || '');
            setUsername(user.username || '');
            setRole(user.role || '');
        })
        .catch(err => console.error(err));
    }, []);


    const handleSave = () => {
        if (!isValidEmail(email)) {
            alert(`Enter a valid email`);
            return;
        }
        if (!fullname) {
           alert(`Enter your Name`);
           return;
        }
        if (!role) {
           alert(`Enter your role`);
           return;
        }

    const updatedData = {
        fullName: fullName,
        email: email,
        username: username,
        role: role
    };

    const token = localStorage.getItem('token');
    fetch('https://eclectics-project-production.up.railway.app/api/users/me', {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(response => {
        if (response.Status === 1) {
           alert('Account details updated successfully');
           Navigate('/lecturer');
        } 
        else {
           alert('Failed to update account: ' + response.Message);
        }
    })
    .catch(error => {
        console.error('Error updating account:', error);
            alert('Something went wrong while updating');
    });
};
  return (
    <div className="staff-dashboard">
                     {/* Sidebar */}
        <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{
            sx: { width: 250, backgroundColor: '#f5f5f5', paddingTop: 2 }}}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar src={profile} sx={{ width: 80, height: 80, mb: 1 }} />
                <Typography variant="h4">{fullName}</Typography>
                <Typography variant="h6"component={Link} to='/lecturer'style={{color:'rgb(1,97,46)',cursor:'pointer'}}>lecturer</Typography>
            </Box>
            <List>
                <ListItemButton component={Link} to="/lecturer"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>menu</span>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" style={{color:'black'}}/>
                </ListItemButton>
                <ListItemButton component={Link} to="/view/profile/staff"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>person</span>
                     </ListItemIcon>
                    <ListItemText primary="Profile" style={{color:'black'}}/>
                </ListItemButton>
                <ListItemButton component={Link} to="/lecsettings"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>settings</span>
                    </ListItemIcon>
                    <ListItemText primary="Settings"style={{color:'black'}} />
                </ListItemButton>
                <ListItemButton component={Link} to="/allrooms"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>more_horiz</span>
                    </ListItemIcon>
                    <ListItemText primary="All Rooms"style={{color:'black'}} />
                </ListItemButton>
                <ListItemButton component={Link} to="/mybookings"style={{height:'2.4rem',border:'1px solid rgb(1,97,46)',
                                width:'80%',marginLeft:'1.2rem',marginTop:'2rem',borderRadius:'5px',color:'black',textAlign:'center'}}>
                    <ListItemText primary="My Bookings" />
                </ListItemButton>
                <ListItemButton component={Link} to="/login"style={{display:'flex',gap:'1rem',marginTop:'4rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>logout</span>
                    </ListItemIcon>
                <ListItemText primary="Logout"style={{color:'black'}} />
                </ListItemButton>
            </List>
        </Drawer>
    
        <main style={{marginTop:'6rem',marginLeft:'8rem'}}>
            <MainCard title="Edit Profile"style={{width:'88%'}}>
                <div className="settings" style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="input">
                        <div className="top-name">
                            <h4>Name</h4>
                        </div>
                        <input type='name'
                               value={fullName}
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
        </main>
    </div>
  );
}
