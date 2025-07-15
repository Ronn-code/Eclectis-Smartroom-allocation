
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import profile from './images/profile3.jpg';

function MyBookings(){
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('https://eclectics-project-production.up.railway.app/api/bookings/my-bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
        })
        .then((res) => {
            console.log('Response status:', res.status);
            if (!res.ok) {
                if (res.status === 401) throw new Error('Unauthorized – token may be invalid');
                throw new Error('Network not responding');}
            return res.json();
        })
        .then((data) => {
            console.log('Fetched data:', data);
            console.log('First booking:', data.Data?.[0]);
            setBookings(Array.isArray(data) ? data : data.Data || []);
        })
        .catch((err) => console.error('Fetch error:', err.message));
}, []);
    const removeDetails = (id) =>{
        if(window.confirm('Are You Sure You want to Delete?')){
            fetch('https://eclectics-project-production.up.railway.app/api/bookings/' +id,{
                method: 'DELETE',
            })
            .then((res)=>{
                alert("Booking Deleted");
                window.location.reload();
            })
            .catch((err)=>(err.message))
        }
    }
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
                            <Typography variant="h4">Ronn Naomi</Typography>
                            <Typography variant="h6"component={Link} to='/login'style={{color:'rgb(1,97,46)',cursor:'pointer'}}>lecturer</Typography>
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
                            <ListItemButton component={Link} to="/setting"style={{display:'flex',gap:'1rem',marginBottom:'0.8rem'}}>
                                <ListItemIcon>
                                    <span className="material-icons"style={{color:'rgb(1,97,46)'}}>settings</span>
                                </ListItemIcon>
                                <ListItemText primary="Settings"style={{color:'black'}} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/mybookings"style={{height:'2.4rem',border:'1px solid rgb(1,97,46)',
                                        width:'80%',marginLeft:'1.2rem',marginTop:'2rem',borderRadius:'5px',color:'black',textAlign:'center'}}>
                                <ListItemText primary="My Bookings" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/login"style={{display:'flex',gap:'1rem',marginTop:'6rem'}}>
                                <ListItemIcon>
                                    <span className="material-icons"style={{color:'rgb(1,97,46)'}}>logout</span>
                                </ListItemIcon>
                                <ListItemText primary="Logout"style={{color:'black'}} />
                            </ListItemButton>
                        </List>
                    </Drawer>
                    <main  style={{background:'white',padding:'1rem',
                                width:'80%',alignContent:'center',
                                 marginTop:'8rem',marginLeft:'6rem',marginBottom:'6rem'}}>
                        <div className="top-links"style={{display:'flex',alignItems:'center',gap:'2rem',marginBottom:'2rem',marginTop:'0'}}>
                            <span className="material-icons">event</span>
                            <h3 style={{margin:'0'}}>My Bookings</h3>
                        </div>
                        <table style={{borderCollapse: 'separate',borderSpacing: '16px 8px'}}>
                            <thead>
                                <tr style={{textAlign:'left',height:'2rem'}}>
                                    <th>StartTime</th>
                                    <th>EndTime</th>
                                    <th>Room No.</th>
                                    <th>Purpose</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((item)=>(
                                    <tr key={item.id}>
                                        <td style={{height:'2.6rem'}}>{item.startTime}</td>
                                        <td style={{height:'2.6rem'}}>{item.endTime}</td>
                                        <td style={{height:'2.6rem'}}>{item.roomNumber}</td>
                                        <td style={{height:'2.6rem'}}>{item.purpose}</td>
                                        <td style={{height:'2.6rem'}}>{item.status}</td>
                                        <td style={{height:'2.6rem'}}>
                                            <button id='remove-btn' onClick={()=>removeDetails(item.id)}
                                                style={{height:'1.75rem',width:'5rem',background:'rgb(7, 90, 46)',
                                                color:'#ececec',border:'none',borderRadius:'4px'}}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
    );
}
export default MyBookings;