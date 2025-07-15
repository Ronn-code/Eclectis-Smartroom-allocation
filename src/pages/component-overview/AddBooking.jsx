import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';

function AddBooking(){
 
    
const{roomid} = useParams();
const[room, setRoom] = useState({});
const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');
const [purpose, setPurpose] = useState('');

const navigate = useNavigate();
  

  useEffect(() =>{
    const token = localStorage.getItem('token');
    fetch('https://eclectics-project-production.up.railway.app/api/rooms/' +roomid,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res)=>{
        if(!res.ok){
            throw new Error('Failed to fetch details');
        }
        return res.json();
    })
    .then((data)=>setRoom(data))
    .catch((err)=>console.log(err.message));
  },[roomid]);


const handleSave = (e) =>{
    e.preventDefault();

    const booking = {startTime, endTime, purpose,room: { id: Number(roomid) }};
    console.log(booking);
    const token = localStorage.getItem('token')
    fetch('https://eclectics-project-production.up.railway.app/api/bookings',{
        method: 'POST',
        headers: {
            "content-type" : "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(booking)
    })
    .then(async(res)=>{
    if(!res.ok){
      const errorData = await res.json().catch(()=>({}));
      console.error('failed to add booking:', errorData);
      throw new Error(`Failed to add booking: ${res.status}`);
    }
    return res.json();
  })
    .then((data)=>{
        alert('Booking Done');
        navigate('/lecturer');
        window.location.reload()
    })
    .catch((err)=>console.log(err.message))
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
            <main style={{background:'white',padding:'1rem',
                        height:'160px',width:'80%',alignContent:'center',
                         marginTop:'12rem',marginLeft:'6rem'}}>
                <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)',
                                              gap:'2rem'}}>
                    <div className="start" style={{display:'flex', flexDirection:'column'}}>
                        <label htmlFor='start'>StartTime</label>
                        <input type='datetime-local'
                               id='start'
                               value={startTime}
                               onChange={(e)=>setStartTime(e.target.value)}
                               placeholder='2025-07-06-04:45'
                               style={{height:'2rem',width:'12rem'}}></input>
                    </div>
                    <div className="end" style={{display:'flex', flexDirection:'column'}}>
                        <label htmlFor='end'>EndTime</label>
                        <input type='datetime-local'
                               id='end'
                               value={endTime}
                               onChange={(e)=>setEndTime(e.target.value)}
                               placeholder='2025-07-06-04:55'
                               style={{height:'2rem',width:'12rem'}}></input>
                    </div>
                    <div className="purpose"style={{display:'flex', flexDirection:'column'}}>
                        <label htmlFor='purpose'>Purpose</label>
                        <input type='text'
                               id='purpose'
                               value={purpose}
                               onChange={(e)=>setPurpose(e.target.value)}
                               placeholder='debbuging'
                               style={{height:'2rem',width:'12rem'}}></input>
                    </div>  
                </div>
                <button id='add' onClick={handleSave}
                    style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem'}}>Save</button>
            </main>
        </div>
    );
}
export default AddBooking;