import {useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';

function EditResource() {


const [name, setName] = useState('');
const [type, setType] = useState('');
const [description, setDescription] = useState('');

const navigate = useNavigate('');
const{equipmentid}=useParams();

useEffect(()=>{
  const token = localStorage.getItem('token')
    fetch('https://eclectics-project-production.up.railway.app/api/equipment/' +equipmentid,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error('Failed to fetch equipment details');
      }
      return res.json();
    })
    .then((data)=>{
      const equipment = data.Data;
      setName(equipment.name);
      setType(equipment.type);
      setDescription(equipment.description)
    })
    .catch((err)=>{
      console.log(err.message);
    })
},[equipmentid]);

const handleSubmit = (e) =>{
  e.preventDefault();

  const equipment = {name,type,description};
  console.log(equipment);
  const token = localStorage.getItem('token')
  fetch('https://eclectics-project-production.up.railway.app/api/equipment/' +equipmentid,{
    method: 'PUT',
    headers: {
      "content-type" : "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(equipment)
  })
  .then((res)=>{
    alert("Equipment Details Updated Successfully");
    navigate('/resources', {replace: true});
  })
  .catch((err)=>console.log(err.message))
}

const handleBack = ()=>{
    navigate('/resources')
}


  return (
    <MainCard title="Add New Equipment">
        <div className="input-fields"style={{ display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)', 
                                              gridTemplateRows: 'repeat(2, auto)',
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
                <input type='text'
                   id='type'
                   value={type}
                   onChange={(e)=>setType(e.target.value)}
                   placeholder='microphone'
                   style={{height:'2rem',width:'12rem'}}></input>
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

export default EditResource
