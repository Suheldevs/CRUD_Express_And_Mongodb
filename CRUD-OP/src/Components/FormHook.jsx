import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
function FormHook() {
const {register,handleSubmit,formState:{errors},} = useForm();

const onSubmit = async(data)=>{
console.log(data);
const apikey ="http://localhost:3000/CRUD/signup";
try{
const responce = await axios.post(apikey, data);
console.log("successfull!",responce.data);
}
catch(error){
console.log(error);
}
}

  return (
    <>
    <div>FormHook</div>

    <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email && <p role='alert'>This field is required</p>}
        <input type="text" name="name" {...register("name" , {required:true},{ pattern: /^[A-Za-z]+$/i })}/>
        <input type="email" name="email" {...register("email")}/>
        <input type="password" name="password" {...register("password")}/>
        <input type='submit'/>
    </form>

    </>

  )
}

export default FormHook