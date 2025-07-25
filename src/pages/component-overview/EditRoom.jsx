import {useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';

function EditRoom() {


const [name, setName] = useState('');
const [roomNumber, setRoomNumber] = useState('');
const [roomType, setRoomType] = useState('');
const [capacity, setCapacity] = useState('');
const [status, setStatus] = useState('');
const [building, setBuilding] = useState('');

const navigate = useNavigate('');
const {roomid} = useParams();

useEffect(()=>{
    const token = localStorage.getItem('token')
    fetch('https://eclectics-project-production.up.railway.app/api/rooms/'+roomid, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error('Failed to fetch room details');
      }
      return res.json();
    })
    .then((data)=>{
      const room = data.Data;
      setName(room.name);
      setRoomNumber(room.roomNumber);
      setRoomType(room.roomType);
      setCapacity(room.capacity);
      setBuilding(room.building);
      setStatus(room.status)
    })
    .catch((err)=>{
      console.log(err.message);
    })
}, [roomid]);
const handleSubmit = (e) =>{
  e.preventDefault();

  const rooms = {roomNumber, roomType, name, capacity, status, building};
  const token = localStorage.getItem('token')
  fetch('https://eclectics-project-production.up.railway.app/api/rooms/'+roomid,{
    method: 'PUT',
    headers: {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(rooms)
  })
  .then((res)=>{
    alert("Room Details Updated Successfully");
    navigate('/rooms', { replace: true });
  })
  .catch((err)=>console.log(err.message))
}

const handleBack = ()=>{
    navigate('/rooms')
}


  return (
    <MainCard title="Add New Room">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(4, 1fr)', 
                                              gridTemplateRows: 'repeat(2, auto)',
                                              gap:'1rem'}}>
            <div className="name" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='name'>Name</label>
                <input type='text'
                   id='name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   placeholder='laboratory'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="roomno" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='roomno'>Room Number</label>
                <input type='text'
                   id='roomno'
                   value={roomNumber}
                   onChange={(e)=>setRoomNumber(e.target.value)}
                   placeholder='RM209'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="roomtype"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='roomtype'>Room Type</label>
                <select
                   id='roomtype'
                   value={roomType}
                   onChange={(e)=>setRoomType(e.target.value)}
                   style={{height:'2rem',width:'12rem'}}>
                    <option value='' disabled>Select type</option>
                    <option value='LECTURE_HALL'>LECTURE_HALL</option>
                    <option value='CLASSROOM'>CLASSROOM</option>
                    <option value='LABORATORY'>LABORATORY</option>
                    <option value='CONFERENCE_ROOM'>CONFERENCE_ROOM</option>
                    <option value='COMPUTER_LAB'>COMPUTER_LAB</option>
                    <option value='AUDITORIUM'>AUDITORIUM</option>
                </select>
            </div>
            <div className="capacity"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='capacity'>Capacity</label>
                <input type='text'
                   id='capacity'
                   value={capacity}
                   onChange={(e)=>setCapacity(e.target.value)}
                   placeholder='100+'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="status"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='status'>Status</label>
                <input type='text'
                   id='status'
                   value={status}
                   onChange={(e)=>setStatus(e.target.value)}
                   placeholder='available'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="building"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='building'>Building</label>
                <input type='text'
                   id='building'
                   value={building}
                   onChange={(e)=>setBuilding(e.target.value)}
                   placeholder='Kilele Block'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
        </div>
        <div className="btns"style={{display:'flex',gap:'2rem'}}>
            <button id='add' onClick={handleSubmit}
                style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem',borderRadius:'10px'}}>Update</button>
            <button id='back'onClick={handleBack} style={{height:'2rem',width:'12rem',
            background:'rgb(90, 7, 7)',color:'#ececec',border:'none',marginTop:'2rem',borderRadius:'10px'}}>Back</button>       
        </div>
    </MainCard>
    
    
        
      
  )
}

export default EditRoom
