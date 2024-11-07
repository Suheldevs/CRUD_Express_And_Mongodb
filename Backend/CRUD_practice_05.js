const express = require("express");
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const databaseURL = "mongodb://localhost:27017/CRUD";
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(databaseURL)
.then(()=>console.log("database connect successfull"))
.catch((err)=>console.log(err))

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const sigupData = mongoose.model('SignupData', signupSchema);


//sign up
app.post('/CRUD/signup', async(req,res)=>{
    try{
      const {name,email,password} = req.body;
      const newData = new sigupData({name,email,password});
     await newData.save();
     res.status(200).json({message:'data save successfully!'});
    }
    catch{
        res.status(500).json({message:'data save successfully!'});
    }
});


//login

app.post('/CRUD/login', async(req,res)=>{
    try{
      const {email,password} = req.body;
      const matchData = await sigupData.findOne({email});
        if(!matchData){
            res.status(400).json({message:'Plese enter a valid Email'});
        }
        matchData.password == password ?  res.status(200).json({message:'Log in successfull',user:matchData}) : res.status(400).json({message:'Plese enter a valid password'});

     
    }
    catch{
        res.status(500).json({message:'database not respose!'});
    }
});

//update data
app.put('/CRUD/update/:id', async(req,res)=>{
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedUser = await sigupData.findByIdAndUpdate(userId, updatedData, {
          new: true,      
          runValidators: true,
        });
    
        if (updatedUser) {
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
      }
    });

//delete data

app.delete('/CRUD/delete/:id', async(req,res)=>{
    const userId = req.params.id;
    try {
        const deletedUser = await sigupData.findByIdAndDelete(userId);
    
        if (deletedUser) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
      }
})


//get data
app.get('/CRUD/get', async(req,res)=>{
  try{
   const data = await sigupData.find()
   res.status(200).json({message:'Data fecth success',user:data})
  }
  catch(error){
    res.status(500).json({message:'server Error',error: error.message});
  }
})



app.listen(3000, ()=>{
    console.log("port running successfull");
})

