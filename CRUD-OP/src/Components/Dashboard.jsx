import React from 'react'
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
function Dashboard() {
    const location = useLocation();

    const user = location.state.user || {};
    console.log(user._id);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({ name: '', email: '', password: '' });





    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {

        const apikey = `http://localhost:3000/CRUD/update/${user._id}`
        try {
            const response = await axios.put(apikey, editData);

            Swal.fire({
                title: 'Success!',
                text: 'You have edit You data successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
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
    };

    const handleDeleteClick = async () => {
        try {
            const apikey = `http://localhost:3000/CRUD/delete/${user._id}`;
            await axios.delete(apikey);
            Swal.fire({
                title: 'Success!',
                text: 'You have delete You data successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
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
            <div>

                <div className='h1'>Dashboard</div>
                <div className='text-center h2 bg-danger text-light'>WElcome! {user._id}</div>
                <Button variant="primary"  className='ms-4' onClick={handleEditClick}>
                    Edit
                </Button>
                <Button variant="primary" className='ms-4' onClick={handleDeleteClick}>
                    Delete
                </Button>



                {/* modal */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={editData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    export default Dashboard