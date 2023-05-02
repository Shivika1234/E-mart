import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from 'react-use-cart';
import CardData from './CardData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const { addItem } = useCart()
  return (
    <div>
      <Card style={{ width: '18rem' }} className='d-flex'>
        {CardData.map((item, index) => {
          return (
            <>
              <div>
                <Container className='d-flex'>



                  <Col>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={item.img} style={{ width: "290px", height: "300px" }} />
                      <Card.Body>
                        <Card.Title>Product</Card.Title>
                        <Card.Text>
                          id= {item.id}
                        </Card.Text>
                        <Card.Text>
                          Name = {item.name}
                        </Card.Text>
                        <Card.Text>
                          price = {item.price}
                        </Card.Text>
                        <Button variant="primary" onClick={() => addItem(item)}>Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>

                </Container>



              </div>
            </>
          )
        })

        }

      </Card>

    </div>
  )
}

export default Home