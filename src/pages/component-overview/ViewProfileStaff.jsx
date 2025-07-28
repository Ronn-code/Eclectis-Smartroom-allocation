import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';



export default function ViewProfileStaff() {

    const[fullName, setFullName]= useState('');
        const[email, setEmail]= useState('');
        const[role, setRole]= useState('');
        const[username, setUsername]= useState('');
        const [department, setDepartment] = useState('');

        const [drawerOpen, setDrawerOpen] = useState(false);
    
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
      
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
            

    return(
        <div className="staff-dashboard" style={{ display: isMobile ? 'block' : 'flex' }}>
           {isMobile && (
                <Button 
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    style={{ 
                        position: 'fixed', 
                        top: 10, 
                        left: 10, 
                        zIndex: 1200,
                        minWidth: 'auto', 
                        padding: '4px' }}>
                    <span className="material-icons" style={{ color: 'rgb(1,97,46)' }}>menu</span>
                </Button>
            )} 
            {/* Sidebar */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                sx: { width: isMobile ? '100%' : 250, 
                      backgroundColor: '#f5f5f5',
                       paddingTop: 2 }}}>
                {isMobile && (
                    <ListItemButton onClick={() => setDrawerOpen(false)}>
                        <ListItemIcon>
                            <span className="material-icons" style={{color:'rgb(1,97,46)'}}>close</span>
                        </ListItemIcon>
                    </ListItemButton>
                )}
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
                    <ListItemButton component={Link} to="/cancel/booking"style={{height:'2.4rem',
                            width:'80%',background:'rgba(160, 18, 18, 1)',marginLeft:'1.2rem',marginTop:'2rem',borderRadius:'5px',color:'#f1ececff',textAlign:'center'}}>
                        <ListItemText primary="Cancel Booking" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/login"style={{display:'flex',gap:'1rem',marginTop:'4rem'}}>
                        <ListItemIcon>
                            <span className="material-icons"style={{color:'rgb(1,97,46)'}}>logout</span>
                        </ListItemIcon>
                        <ListItemText primary="Logout"style={{color:'black'}} />
                    </ListItemButton>
                </List>
            </Drawer>
    
            <main style={{marginTop: isMobile ? '60px' : '60px',
                        marginLeft: isMobile ? '10px' : '300px',
                        ...(isMobile && {
                            width: '100%',
                            padding: '1rem',
                            boxSizing: 'border-box',
                            overflowX: 'hidden',
                            marginLeft: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                    })}}>
                <MainCard title='View Profile' style={{
                                                  ...(!isMobile && {
                                                    width:'600px',
                                                    marginTop: '1.2rem',
                                                    marginLeft: '30%',}),

                                                  ...(isMobile && {
                                                    width: '90%',
                                                    margin: '1rem auto',
                                                    padding: '1rem'})
                                                }}>
                    <div className="view-details">
                        <div className="head" style={{display:'flex',
                                                      gap: isMobile ? '1rem' : '2rem',
                                                      alignItems: 'center',
                                                      ...(isMobile && {
                                                        flexDirection: 'column',
                                                        textAlign: 'center'})
                                                    }}>
                            <img src={profile} style={{borderRadius:'50%',
                                                       height: isMobile ? '3rem' : '4rem',
                                                       width: isMobile ? '3rem' : '4rem',
                                                       objectFit: 'cover'}}></img>
                            <h4 style={isMobile ? { margin: '0.5rem 0' } : {}}>{username}</h4>
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
                                        width: isMobile ? '80%' : '50%',
                                        marginLeft: isMobile ? 'auto' : '1.2rem',
                                        marginRight: isMobile ? 'auto' : '0',
                                        marginTop:'1.2rem',
                                        borderRadius:'5px',
                                        color:'black',
                                        textAlign:'center'}}>
                            <ListItemText primary="Change Password" />
                        </ListItemButton>
                    </div>
                </MainCard>
            </main>
        </div>    
    );
}









