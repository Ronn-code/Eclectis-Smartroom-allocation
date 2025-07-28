import { useEffect, useMemo, useState } from 'react';
import {Link} from 'react-router-dom';
import profile from './images/profile3.jpg';
import {Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Typography,Box,Button,TextField,} from '@mui/material';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {createViewDay,createViewWeek,createViewMonthGrid,createViewMonthAgenda} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';   // 👈
import '@schedule-x/theme-default/dist/index.css';



export default function CalendarWithBookings() {
 const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
            
            useEffect(() => {
              const handleResize = () => {
                setIsMobile(window.innerWidth <= 600);
              };
              
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
            }, []);

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

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://eclectics-project-production.up.railway.app/api/bookings/my-bookings', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setBookings(Array.isArray(data) ? data : data.Data || []))
      .catch(console.error);
  }, []);

  /* convert to Schedule‑X format ---------------------------------- */
  const toSchedX = iso => {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
         + `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const events = useMemo(
    () =>
      bookings.map(b => ({
        id: String(b.id),
        start: toSchedX(b.startTime),
        end:   toSchedX(b.endTime),
        title: `Room ${b.roomNumber}`

      })),
    [bookings]
  );

  /*  create calendar + plugin -------------------------------------- */
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda()
    ],
    events: [],            // start empty
    plugins: [eventsService],
  });

  /*  feed the events after fetch ----------------------------------- */
  useEffect(() => {
    if (events.length) eventsService.set(events);   // 👈 now calendar sees them
  }, [events, eventsService]);

  return (
    <div className="staff-dashboard"style={{ display: isMobile ? 'block' : 'flex' }}>
      
      {isMobile && (
        <Button 
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ 
          position: 'fixed', 
          top: 16, 
          left: 10, 
          zIndex: 1200,
          minWidth: 'auto', 
          padding: '8px' }}>
          <span className="material-icons" style={{ color: 'rgb(1,97,46)' }}>menu</span>
        </Button>
      )}
      {/* Sidebar */}
      <Drawer variant={isMobile ? "temporary" : "permanent"} 
              anchor="left"
              open={isMobile ? drawerOpen : true}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{sx: { width: isMobile ? '100%' : 250, backgroundColor: '#f5f5f5', paddingTop: 2 }}}>
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
      <main style={{ height: '100vh', overflow: 'auto' ,
                   ...(!isMobile && {
                    marginLeft: '500px',
                    width: 'calc(100%-250px)',
                    padding:'1rem'
                   }),
                   ...(!isMobile && {
                    height: 'calc(100vh-60px)',
                    marginTop: '60px'
                   })
      }}>
        <div >
          <ScheduleXCalendar calendarApp={calendar} style={{height: '100%', width: '100%'}}/>
        </div>
      </main>
    </div>
  );
}
