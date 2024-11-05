import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate();
  const [formData, SetFormData] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apikey = "http://localhost:3000/CRUD/signup";
    try {
      const response = await axios.post(apikey, formData);
      console.log("signup Successfull", response.data);
      
      SetFormData({name:'',email:'',password:''});
      Swal.fire({
        title: 'Success!',
        text: 'You have signed up successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

     
  
        navigate('/login',{state:{message:'You have succefully signup!'}})
      


    }
    catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message || 'Login failed',
          icon: 'error',
          confirmButtonText: 'Try Again'
      });
    }


  }


  return (
    <>
      <h1>Signup</h1>
      <form className='m-5' method="post">
        <label className='form-label'>Name</label>
        <input className='form-control w-50 ' type='text' name='name' value={formData.name} onChange={handleChange} />
        <label className='form-label'>Email</label>
        <input className='form-control w-50 ' type='email' name='email' value={formData.email} onChange={handleChange} />
        <label className='form-label'>Password</label>
        <input className='form-control w-50 mb-3 ' type='password' name='password' value={formData.password} onChange={handleChange} />
        <button className='form-control w-25 text-center' type='reset' onClick={handleSubmit}>SignUp</button>
      </form>
    </>
  )
}

export default Signup