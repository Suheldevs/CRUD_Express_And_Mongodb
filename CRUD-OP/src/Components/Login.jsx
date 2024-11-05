import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Login() {
    const location = useLocation();
    
    const message = location.state?.message;
    const navigate = useNavigate();



  const [formData ,SetFormData] = useState({email:'',password:''})
 
  const handleChange = (e)=>{
    SetFormData({...formData, [e.target.name]:e.target.value});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const apikey = "http://localhost:3000/CRUD/login";
    try{
      const response = await axios.post(apikey,formData);
      console.log("Loginsuccefull Successfull",response.data);


      SetFormData({email:'',password:''});
      Swal.fire({
        title: 'Success!',
        text: 'You have Login successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    

      navigate('/dashboard',{state:{user :response.data.user}})
  


    }
    catch(err){
if(err.response){
  
    Swal.fire({
        title: 'Error!',
        text: err.response.data.message || 'Login failed',
        icon: 'error',
        confirmButtonText: 'Try Again'
    });
}
    }

    
  }


  return (
    <>
    <h1>Log In</h1>
    <h3 className='text-success text-center'>{message?message:'hello'}</h3>
    <h3 className='text-info text-center'>Please Login</h3>
    <form className='m-5' method="post">
      <label className='form-label'>Email</label>
      <input className='form-control w-50 ' type='email' name='email' value={formData.email} onChange={handleChange}/>
      <label className='form-label'>Password</label>
      <input className='form-control w-50 mb-3 ' type='password' name='password' value={formData.password} onChange={handleChange}/>
      <button className='form-control w-25 text-center bg-success' type='reset' onClick={handleSubmit}>Login</button>
    </form>
    </>
  )
}

export default Login