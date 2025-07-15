import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import profile from './images/profile3.jpg';
import room2 from './images/room2.jpg'
import'./index.css';
import { useNavigate } from 'react-router-dom';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';



function Lecturer() {

const [rooms, setRooms] = useState([]);

const displayDetails = (id) =>{
    navigate(`/addbooking/${id}`);
}

useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://eclectics-project-production.up.railway.app/api/rooms', {
        method: 'GET',
        headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
    })
    .then((res)=>{
            if(!res.ok){
                throw new Error('Failed to fetch lecturer dashboard');
            }
            return res.json();
    })
    .then((data)=> {
            setRooms(data.Data || []);
    })
    .catch((err)=>{
            console.log(err.message);
            setRooms([]);
    });
}, []);

const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();


    return (
        <div className="staff-dashboard">
                 {/* Sidebar */}
            <Drawer
               variant="permanent"
               anchor="left"
               PaperProps={{
               sx: { width: 250, backgroundColor: '#f5f5f5', paddingTop: 2 }}}
>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar src={profile} sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="h4">Ronn Naomi</Typography>
                    <Typography variant="h6"component={Link} to='/lecturer'style={{color:'rgb(1,97,46)',cursor:'pointer'}}>lecturer</Typography>
                </Box>

                <List>
                    <ListItemButton component={Link} to="/lecturer"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                        <ListItemIcon>
                            <span className="material-icons"style={{color:'rgb(1,97,46)'}}>menu</span>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" style={{color:'black'}}/>
                    </ListItemButton>
                    <ListItemButton component={Link} to="/login"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                        <ListItemIcon>
                            <span className="material-icons"style={{color:'rgb(1,97,46)'}}>person</span>
                        </ListItemIcon>
                        <ListItemText primary="Profile" style={{color:'black'}}/>
                    </ListItemButton>
                    <ListItemButton component={Link} to="/settings"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                        <ListItemIcon>
                            <span className="material-icons"style={{color:'rgb(1,97,46)'}}>settings</span>
                        </ListItemIcon>
                        <ListItemText primary="Settings"style={{color:'black'}} />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/lecturer"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
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
                <h2 style={{marginTop:'2rem',textAlign:'center',fontSize:'1.4rem',fontWeight:'450'}}> Smart Room Allocation</h2>
                <div className="main-top">
                    <input
                        type='text'
                        className='search'
                        placeholder='Search rooms'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const term = searchTerm.toLowerCase();
                                if (term.includes('2 screens') || term.includes('microphone')) {
                                    navigate('/resource1');}
                                else {
                                    alert('No match found');
                                }
                            }
                        }} />

                </div>
                    <h3>Available Rooms Today</h3>
                    <div className='rooms-row'>
                        {rooms && rooms.map((item) =>(
                            <div className="rooms">
                                <img src={room2}></img>
                                <div className="room-details" key={item.roomNumber}>
                                    <h4><b>Room No:</b> {item.roomNumber}</h4>
                                    <h4><b>Room Type:</b> {item.roomType.toLowerCase()}</h4>
                                    <h4><b>Capacity:</b> {item.capacity}</h4>
                                    
                                    <button onClick={()=> displayDetails(item.id)} id='book-btn'>Add booking</button>
                                </div> 
                            </div>
                        ))}
                    </div>   
            </main>
        </div>
    )
}

export default Lecturer