import React, { useState } from 'react'
import { useCart } from "react-use-cart"
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Cart() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart()
    if (isEmpty) {
        return (<h1 className='text-center'> Your Cart Is Empty</h1>)
    }

    const checkoutHandler = async (amount) => {
        const {
          data: { key },
        } = await axios.get(`http://localhost:5000/api/getkey`);
    
        const {
          data: { order },
        } = await axios.post(`http://localhost:5000/api/checkout`, {
          amount,
        });
    
        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "6 Pack Programmer",
          description: "For Testing purpose",
          image:
            "https://saurabh12345.s3.ap-south-1.amazonaws.com/profile_photo1681802472225.png",
          order_id: order.id,
          callback_url: "http://localhost:5000/api/paymentverification",
          prefill: {
            name: "Shivika",
            email: "shivikashri.72@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#121212",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
        // console.log(window)
      };

    return (
        <section className='py-4 container'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h5>
                        Cart ({totalUniqueItems}) totalItems:({totalItems})
                    </h5>
                    <Table striped bordered hover>

                        <tbody className='table table-light table-hover m-0'>

                            {
                                items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={item.img} style={{ width: "90px", height: "90px" }} /></td>
                                            {/* <td>{item.pid}</td> */}
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>Quantity ({item.quantity})</td>
                                            <td>
                                                <button variant="primary" onClick={() => updateItemQuantity(item.id, item.quantity
                                                    - 1)}>-</button>
                                            </td>
                                            <td>
                                                <button variant="primary" onClick={() => updateItemQuantity(item.id, item.quantity
                                                    + 1)}>+</button>
                                            </td>
                                            <button variant="primary" onClick={() => removeItem(item.id)}> Remove item</button>
                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </Table>
                    <div>
                        <h2>Total Price {cartTotal}</h2>
                        <button onClick={() => { emptyCart() }}> Clear All Cart</button>
                        <Button onClick={handleShow}>CheckOut</Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Phone " />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Address" />
                                </Form.Group>
        
                            </Form></Modal.Body>
                            <Modal.Footer>
                            
                              
                                <Button variant="primary" onClick={() =>checkoutHandler(cartTotal)}>
                                   Pay {cartTotal}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>
            </div>

        </section>
    )
}
