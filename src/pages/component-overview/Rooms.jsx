import { useEffect, useState } from 'react';
import './rooms.css';
import { Link, useNavigate } from 'react-router-dom';

function Rooms(){

    const editDetails = (id)=>{
        navigate("/editroom/" +id)
    }
    const [rooms, setRooms] = useState([]);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        console.log('Auth header →', `Bearer ${token}`);

        fetch('https://eclectics-project-production.up.railway.app/api/rooms',{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
                
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error('Failed to fetch rooms');
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

    const navigate = useNavigate('');

    const removeDetails = (id) =>{
        if(window.confirm('Are You Sure You want to Delete?')){
            const token = localStorage.getItem('token');
            fetch('https://eclectics-project-production.up.railway.app/api/rooms/' +id,{
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Delete failed');
                }
                alert("Room Deleted");
                window.location.reload();
            })
            .catch((err)=>console.log(err.message))
        }
    }
    return(
        <div className="rooms-container">
            <div className="bars">
                <Link to='/addroom'>
                <button id='add-btn'><span className='material-icons'>add</span>Add Room</button></Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Name</th>
                        <th>Room type</th>
                        <th>Building</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rooms) ? (
                        rooms.map((item) =>(
                            <tr>
                                <td>{item.roomNumber.toUpperCase()}</td>
                                <td>{item.name}</td>
                                <td>{item.roomType.toLowerCase()}</td>
                                <td>{item.building}</td>
                                <td>{item.capacity}</td>
                                <td>{item.status.toUpperCase()}</td>
                                <td className='actions'>
                                    <button id='editing-btn'onClick={()=>editDetails(item.id)}>Edit</button>
                                    <button id='delete-btn'onClick={()=>removeDetails(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )) 
                        ) : ( 
                            <tr><td colSpan='7'>No rooms found or data still loading</td></tr>  
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default Rooms;