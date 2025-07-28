
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';
import { maxWidth, padding } from '@mui/system';

export default function Cancel() {
    const [fullName, setFullName] = useState('');
    const[bookings, setBookings] = useState('');
    const[roomNumber, setRoomNumber]= useState('');
    const[startTime, setStartTime]= useState('');
    const[endTime, setEndTime]= useState('');
    const[status, setStatus]= useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

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
        fetch('https://eclectics-project-production.up.railway.app/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(r => r.json())
          .then(data => setBookings(Array.isArray(data) ? data : data.Data || []))
          .catch(console.error);
      }, []);
    const removeDetails = (id) =>{
        if(window.confirm('Are You Sure You want to Cancel?')){
            const token = localStorage.getItem('token');
            console.log('Deleting booking with ID:', id); // Log the ID being sent
console.log('Using token:', token); // Verify token exists
            fetch(`https://eclectics-project-production.up.railway.app/api/bookings/${id}/cancel`, {
                method: 'PUT',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Delete failed');
                }
                alert("Booking Cancelled Successfully");
                window.location.reload();
            })
            .catch((err)=>console.log(err.message))
        }
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
          
          useEffect(() => {
            const handleResize = () => {
              setIsMobile(window.innerWidth <= 600);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, []);
  return (
    <div className="cancel-dashboard" style={{ display: isMobile ? 'block' : 'flex' }}>
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
            sx: { width: isMobile ? '100%' : 250, backgroundColor: '#f5f5f5', paddingTop: 2 }}}>
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
                <ListItemButton component={Link} to="/login"style={{display:'flex',gap:'1rem',marginTop:'4rem'}}>
                    <ListItemIcon>
                        <span className="material-icons"style={{color:'rgb(1,97,46)'}}>logout</span>
                    </ListItemIcon>
                <ListItemText primary="Logout"style={{color:'black'}} />
                </ListItemButton>
            </List>
        </Drawer>
    
        <main style={{boxSizing: 'border-box',overflowX: 'hidden',
                    ...(isMobile ? {
                        width: '100%',
                        padding: '1rem',
                        marginTop: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    } :
                    {
                        width: 'calc(100%-250px',
                        marginLeft: '340px', 
                        marginTop: '20px',
                        padding: '2rem',
                        display: 'flex',
                        justifyContent: 'center'
                    })
                }}>
            <MainCard title="My Bookings Done"style={{
                                                  width: isMobile ? '100%' : '800px',
                                                  padding: isMobile ? '16px' : '24px',
                                                  borderRadius: '12px',
                                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                  overflowX: isMobile ? 'auto' : 'visible'}}>
                <div style={{ 
                            minWidth: isMobile ? '600px' : 'auto', // Force minimum width for mobile
                            overflowX: isMobile ? 'auto' : 'visible'
                        }}>                                    
                    <table style={{ width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: isMobile ? '14px' : '16px',
                                    minWidth: isMobile ? '600px' : 'auto' }}>
                        <thead>
                            <tr  style={{ 
                                       borderBottom: '1px solid #e0e0e0',
                                       textAlign: 'left'}} >
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Room</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Start Time</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>End Time</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(bookings) ? (
                                bookings.map((item)=>(
                                    <tr key={item.id}>
                                        <td style={{padding: '12px 16px'}}>{item.roomNumber}</td>
                                        <td style={{padding: '12px 16px'}}>{item.startTime}</td>
                                        <td style={{padding: '12px 16px'}}>{item.endTime}</td>
                                        <td style={{padding: '12px 16px'}}>{item.status}</td>
                                        <td style={{padding: '12px 16px'}}>
                                            <button onClick={()=>removeDetails(item.id)}
                                                style={{height:'1.6rem',width:'4.5rem',background:'rgb(160,18,18,1)', borderRadius:'3px',border:'none',color:'#e6e2e2ff'}}>Cancel</button>
                                        </td>
                                    </tr> 
                                ))
                            ) : null }
                        </tbody>
                    </table> 
                </div> 
            </MainCard>
        </main>
    </div>
  );
}
