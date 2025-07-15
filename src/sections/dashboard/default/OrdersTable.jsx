import { useEffect, useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router';

export default function OrdersTable() {
  const [users, setUsers] = useState([]);

  const navigate= useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://eclectics-project-production.up.railway.app/api/users',{
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      }
    })
    .then((res)=>{
      if(!res.ok) {
        throw new Error('failed to fetch users');
      }
      return res.json();
    })
    .then((data)=>{
      console.log('fetched users:', data);
      setUsers(data?.Data || []);
    })
    .catch((err)=>{
      console.log(err.message);
      setUsers([]);
    });
  }, []);

  const displayDetails = (id) => {
    navigate('/viewuser/' +id)
  };

  return (
    <div className="body-main">
      <h3>Active Users</h3>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((item) => (
            <tr key={item.id}>
              <td>{item.fullName}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.role.toUpperCase()}</td>
              <td>{item.department}</td>
              <td>{item.usageStreak}</td>
              <td>{item.createdAt}</td>
              <td className="actions">
                <button id="review-btn" onClick={() => displayDetails(item.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}