import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

function AddResource() {


const [name, setName] = useState('');
const [type, setType] = useState('');
const [description, setDescription] = useState('');
const [roomNumber, setRoomNumber] = useState('');
const Navigate = useNavigate('');

const handleSubmit = (e) =>{
  e.preventDefault();

  const token = localStorage.getItem('token');
  const equipment = {name,type,description,  roomNumber};
  console.log(equipment);
  fetch('https://eclectics-project-production.up.railway.app/api/equipment',{
    method: 'POST',
    headers: {
      "content-type" : "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(equipment)
  })
  .then(async(res)=>{
    if(!res.ok){
      const errorData = await res.json().catch(()=>({}));
      console.error('failed to add equipment:', errorData);
      throw new Error(`Failed to add equipment: ${res.status}`);
    }
    return res.json();
  })
  .then((data)=>{
    alert("New Equipment Added Successfully");
    Navigate('/dashboard/default');
    window.location.reload();
  })
  .catch((err)=>console.log(err.message))
}




  return (
    <MainCard title="Add New Equipment">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(4, 1fr)', 
                                              gap:'1rem'}}>
            <div className="name" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='name'>Name</label>
                <input type='text'
                   id='name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   placeholder='Microphone'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="type" style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='type'>Type</label>
                <select
                   id='type'
                   value={type}
                   onChange={(e)=>setType(e.target.value)}
                   style={{height:'2rem',width:'12rem'}}>
                    <option value='' disabled>Select type</option>
                    <option value='PROJECTOR'>PROJECTOR</option>
                    <option value='PA_SYSTEM'>PA_SYSTEM</option>
                    <option value='WHITEBOARD'>WHITEBOARD</option>
                    <option value='COMPUTER'>COMPUTER</option>
                    <option value='AIR_CONDITIONING'>AIR_CONDITIONING</option>
                    <option value='MICROPHONE'>MICROPHONE</option>
                    <option value='SCREEN'>SCREEN</option>
                    <option value='SPEAKERS'>SPEAKERS</option>
                   </select>
            </div>
            <div className="descript"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='descript'>Description</label>
                <input type='text'
                   id='descript'
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   placeholder='Wireless microphone'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
            <div className="descript"style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='descript'>Room Number</label>
                <input type='text'
                   id='descript'
                   value={roomNumber}
                   onChange={(e)=>setRoomNumber(e.target.value)}
                   placeholder='23'
                   style={{height:'2rem',width:'12rem'}}></input>
            </div>
        </div>
        <button id='add' onClick={handleSubmit}
                style={{height:'2rem',width:'12rem',background:'rgb(7, 90, 46)',
                    color:'#ececec',border:'none',marginTop:'2rem'}}>Add Equipment</button>
    </MainCard>
    
    
        
      
  )
}

export default AddResource
