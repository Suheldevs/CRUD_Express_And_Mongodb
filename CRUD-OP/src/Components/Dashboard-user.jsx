import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Modal, Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
function Dashboarduser() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dataFetch = async () => {

        const apikey = "http://localhost:3000/CRUD/get";
        try {
            const responce = await axios.get(apikey);
            setData(responce.data.user);
            console.log(data);
        }
        catch (error) {
            alert(error);
        }
    }



    const onSubmit = async (data) => {

        const apikey = "http://localhost:3000/CRUD/signup";
        try {
            const response = await axios.post(apikey, data);
            console.log("signup Successfull", response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Data added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
            dataFetch();




        }
        catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message || 'Login failed',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }

setShowModal(false);
    }

    useEffect(() => {
        dataFetch();
    }, [])
 useEffect(()=>{
    SetNewData(data);
 },[data])
    const [newData,SetNewData] = useState([])
    const [searchText,setSearchText]=useState('');
const handleChange =(e)=>{
setSearchText(e.target.value)
}

const searchHandle = (e) => {
    e.preventDefault();
    if (!searchText) {
       
        SetNewData(data);
    } 
    else {
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        SetNewData(filteredData);
    }
};

    const {register,handleSubmit,formState:{error},} = useForm()
    return (
        <div>
            <div className=""> <div className="h2 text-light bg-warning text-center ">Users</div>
                <div className="d-flex justify-content-between m-3">
                    <div className="btn btn-success" onClick={() => setShowModal(true)}>ADD</div>
                    <div className="">
                        <input type="text" className='form-control d-inline w-50 mx-2' placeholder='Search' name='search' value={searchText} onChange={handleChange} />
                        <button className='btn btn-outline-success'onClick={searchHandle}>Search</button>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newData.slice().reverse().map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* modal start */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                               {...register('name')}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formScore">
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                              {...register('email')}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formScore">
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                              {...register('password')}
                                required
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Add User
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* modal End */}
        </div>
    )
}

export default Dashboarduser