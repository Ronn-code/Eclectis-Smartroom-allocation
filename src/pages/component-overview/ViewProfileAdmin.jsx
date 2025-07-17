import MainCard from "components/MainCard";
import { useEffect, useState } from 'react';
import avatar1 from 'assets/images/users/avatar-1.png';
import { Link} from "react-router";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { height, width } from "@mui/system";


export default function ViewProfileAdmin(){

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
        <MainCard title='View Profile' style={{width:'40%',height:'25%',marginTop:'0rem',marginLeft:'30%'}}>
            <div className="view-details">
                <div className="head" style={{display:'flex',gap:'2rem'}}>
                    <img src={avatar1} style={{borderRadius:'50%'}}></img>
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
                <ListItemButton component={Link} to="/change/password"style={{height:'2rem',border:'1px solid rgb(1,97,46)',
                                width:'50%',marginLeft:'1.2rem',marginTop:'1.2rem',borderRadius:'5px',color:'black',textAlign:'center'}}>
                    <ListItemText primary="Change Password" />
                </ListItemButton>
            </div>
        </MainCard>
    );
}