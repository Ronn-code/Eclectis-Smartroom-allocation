import { useEffect, useState } from 'react';
import './resources.css';
import { Link, useNavigate } from 'react-router-dom';

function Resources(){

    const editDetails = (id)=>{
        navigate('/editresource/' +id)
    }
    const[equipment, setEquipment] = useState([]);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        fetch('https://eclectics-project-production.up.railway.app/api/equipment',{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error('Failed to fetch equipments');
            }
            return res.json();
        })
        .then((data)=> {
            setEquipment(data.Data || []);
        })
        .catch((err)=>{
            console.log(err.message);
            setEquipment([]);
        });
    }, []);

    const navigate = useNavigate();
    const removeDetails = (id) =>{
        if(window.confirm('Are You Sure You want to Delete?')){
             const token = localStorage.getItem('token');
            fetch('https://eclectics-project-production.up.railway.app/api/equipment/' +id,{
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
                alert('Equipment Deleted');
                window.location.reload();
            })
            .catch((err)=>(err.message))
        }
    }
    return(
        <div className="resources-container">
            <Link to='/addresource'>
            <button id='add-btn'><span className='material-icons'>add</span>Add Resource</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(equipment) ? (
                        equipment.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.name.toUpperCase()}</td>
                                <td>{item.type.toLowerCase()}</td>
                                <td>{item.description}</td>
                                <td className='actions'>
                                    <button id='editing-btn'onClick={()=>editDetails(item.id)}>Edit</button>
                                    <button id='delete-btn'onClick={()=>removeDetails(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No equipment found or data still loading.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default Resources;