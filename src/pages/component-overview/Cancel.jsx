
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';


export default function Cancel() {
    const [fullName, setFullName] = useState('');
    const[bookings, setBookings] = useState('');
    const[roomNumber, setRoomNumber]= useState('');
    const[startTime, setStartTime]= useState('');
    const[endTime, setEndTime]= useState('');
    const[status, setStatus]= useState('');
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
        if(window.confirm('Are You Sure You want to Delete?')){
            const token = localStorage.getItem('token');
            console.log('Deleting booking with ID:', id); // Log the ID being sent
console.log('Using token:', token); // Verify token exists
            fetch(`https://eclectics-project-production.up.railway.app/api/bookings/${id}/cancel`, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Delete failed');
                }
                alert("Booking Deleted Successfully");
                window.location.reload();
            })
            .catch((err)=>console.log(err.message))
        }
    }
  return (
    <div className="cancel-dashboard" style={{display:'grid',gridTemplateColumns:'30% auto'}}>
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
    
        <main style={{marginTop:'3rem',marginLeft:'4rem'}}>
            <MainCard title="My Bookings Done"style={{width:'70%',marginBottom:'2rem'}}>
                <table style={{marginLeft:'1rem'}}>
                    <thead>
                        <tr >
                            <th style={{textAlign:'start',paddingRight:'1rem'}}>Room Number</th>
                            <th style={{textAlign:'start'}}>startTime</th>
                            <th style={{textAlign:'start'}}>endTime</th>
                            <th style={{textAlign:'start'}}>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bookings) ? (
                            bookings.map((item)=>(
                                <tr key={item.id}>
                                    <td style={{fontSize:'0.7rem'}}>{item.roomNumber}</td>
                                    <td style={{fontSize:'0.7rem', padding:'0.7rem 0.7rem 0.7rem 0'}}>{item.startTime}</td>
                                    <td style={{fontSize:'0.7rem'}}>{item.endTime}</td>
                                    <td style={{fontSize:'0.7rem'}}>{item.status}</td>
                                    <td style={{paddingLeft:'1rem'}}>
                                        <button onClick={()=>removeDetails(item.id)}
                                                style={{height:'1.6rem',width:'4.5rem',background:'rgb(160,18,18,1)', borderRadius:'3px',border:'none',color:'#e6e2e2ff'}}>Delete</button>
                                    </td>
                               </tr> 
                            ))
                        ) : null }
                    </tbody>
                </table>  
            </MainCard>
        </main>
    </div>
  );
}
