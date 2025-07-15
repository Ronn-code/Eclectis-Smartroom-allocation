import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

function AddRoom() {


const [name, setName] = useState('');
const [roomNumber, setRoomNumber] = useState('');
const [roomType, setRoomType] = useState('');
const [capacity, setCapacity] = useState('');
const [floor, setFloor] = useState('');
const [building, setBuilding] = useState('');
const Navigate = useNavigate('');

const handleSubmit = (e) =>{
  e.preventDefault();

  const token = localStorage.getItem('token');
  const rooms = {roomNumber, roomType, name, capacity, floor, building};
  console.log(rooms);
  console.log("Token being sent:", token);

  fetch('https://eclectics-project-production.up.railway.app/api/rooms',{
    method: 'POST',
    headers: {
      "content-type" : "application/json",
      'Authorization': `Bearer ${token}`
      
    },
    body: JSON.stringify(rooms)
  })
  .then(async(res)=>{
    if(!res.ok){
      const errorData = await res.json().catch(()=>({}));
      console.error('failed to add room:', errorData);
      throw new Error(`Failed to add room: ${res.status}`);
    }
    return res.json();
  })
  .then((data)=>{
    alert("New Room Added Successfully");
    Navigate('/dashboard/default');
    window.location.reload();
  })
  .catch((err)=>console.log(err.message))
}




  return (
    <MainCard title="Add New Room">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)',
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
                <label htmlFor='floor'>Floor</label>
                <input type='text'
                   id='floor'
                   value={floor}
                   onChange={(e)=>setFloor(e.target.value)}
                   placeholder='3'
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
        <button id='add' onClick={handleSubmit}
                style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem'}}>Add Room</button>
    </MainCard>
    
    
        
      
  )
}

export default AddRoom
