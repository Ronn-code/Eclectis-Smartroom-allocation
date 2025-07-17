import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import avatar1 from 'assets/images/users/avatar-1.png';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';



export default function ViewProfileStaff() {

    const[fullName, setFullName]= useState('');
        const[email, setEmail]= useState('');
        const[role, setRole]= useState('');
        const[username, setUsername]= useState('');
        const [department, setDepartment] = useState('');
    
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
                setDepartment(user.department || '');
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
                <MainCard title='View Profile' style={{width:'40%',marginTop:'1.2rem',marginLeft:'30%'}}>
                            <div className="view-details">
                                <div className="head" style={{display:'flex',gap:'2rem'}}>
                                    <img src={profile} style={{borderRadius:'50%',height:'4rem'}}></img>
                                    <h4>{username}</h4>
                                </div>
                                <ListItemButton >
                                    <ListItemText primary="Username" secondary= {fullName} />
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemText primary="Email" secondary={email} />
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemText primary="Department" secondary={department} />
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemText primary="Role" secondary={role} />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/change/pwd"style={{height:'2rem',border:'1px solid rgb(1,97,46)',
                                                width:'50%',marginLeft:'1.2rem',marginTop:'1.2rem',borderRadius:'5px',color:'black',textAlign:'center'}}>
                                    <ListItemText primary="Change Password" />
                                </ListItemButton>
                            </div>
                        </MainCard>
            </main>
        </div>    
    );
}









