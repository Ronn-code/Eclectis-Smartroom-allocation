import { useEffect, useState } from 'react';
import './user.css';
import { Link, useNavigate } from 'react-router-dom';



function User(){
    const navigate = useNavigate();
    const editUser = (id)=>{
        navigate("/edituser/" +id)
    }

    const[users, setUsers] = useState([]);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        fetch('https://eclectics-project-production.up.railway.app/api/users',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            return res.json();
        })
        .then((data)=> {
            setUsers(data.Data || []);
        })
        .catch((err)=>{
            console.log(err.message);
            setUsers([]);
        });
    }, []);


    const removeDetails = (id) =>{
        if(window.confirm('Are You Sure You want to Delete?')){

            const token = localStorage.getItem('token');
            fetch('https://eclectics-project-production.up.railway.app/api/users/' +id,{
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                }
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Delete failed');
                }
                alert('User Deleted');
                window.location.reload();
            })
            .catch((err)=>console.log(err.message));
        }
    }
    return(
        <div className="user-container">
            <Link to='/adduser'>
            <button id='add-btn'><span className='material-icons'>add</span>Add User</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Total bookings</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) ? (
                        users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.fullName}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role.toUpperCase()}</td>
                                <td>{item.department}</td>
                                <td>{item.totalBookings}</td>
                                <td className='actions'>
                                    <button id='editing-btn' onClick={() => editUser(item.id)}>Edit</button>
                                    <button id='delete-btn' onClick={() => removeDetails(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr><td colSpan="7">No users found or data still loading.</td></tr>
                    )}
</tbody>

            </table>
        </div>
    );
}
export default User;