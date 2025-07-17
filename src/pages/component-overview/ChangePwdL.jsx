import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';


export default function ChangePwdL() {

    const[oldPassword, setOldPassword]= useState('');
    const[newPassword, setNewPassword]= useState('');
    const navigate = useNavigate();
        
        
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
            navigate('/lecturer');
        } 
        else {
            alert('Failed to update password: ' + response.Message);
        }
    })
    .catch(error => {
        console.error('Error updating password:', error);
            alert('Something went wrong while updating');
    });
    }

    const [fullName, setFullName] = useState('');
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
    return(
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
            
            <main>
                <MainCard title="Change Password" style={{width:'80%',marginTop:'6rem',marginLeft:'10%'}}>
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
            </main>
        </div>
    );
}