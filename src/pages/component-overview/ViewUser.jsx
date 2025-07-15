import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Viewuser() {

    const{userid} = useParams();
    const[user, setUser] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem('token');
        fetch(`https://eclectics-project-production.up.railway.app/api/users/${userid}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(me || "User not found");
            }
            return res.json();
        })
        .then(data=>setUser(data))
        .catch((err)=>console.log(err.message));
    }, [userid]);
  return (
    <div className="view-user-container">
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Streak</th>
                    <th>CreatedOn</th>
                </tr>
            </thead>
            <tbody>
                {user && <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>{user.usageStreak}</td>
                    <td>{user.createdAt}</td>
                    </tr>}
            </tbody>
        </table>
    </div>
  )
}

export default Viewuser;
