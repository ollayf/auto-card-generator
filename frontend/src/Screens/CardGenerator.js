import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import {Row, Col, Container} from 'reactstrap'
import Button from 'react-bootstrap/Button'
import image from '../images/card-template1.jpg'
import axios from 'axios';
import { useState } from "react";

/**
 * Initialize state to save the following data:
 *      top text
 *      bottom text
 *      random image (intialize with "http://i.imgflip.com/1bij.jpg")
 */

export default function CardGenerator ({navigate, telegramId, uid}) {

    const [senderName, setSenderName] = useState('');
    const [recepientName, setRecepientName] = useState('');
    const [message, setMessage] = useState('');
    const [prompt, setPrompt] = useState('');
    const [theme, setTheme] = useState(0);

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/submission/',
            data: {
                senderName: senderName,
                recepientName: recepientName,
                message: message,
                prompt: prompt,
                theme: theme,
                telegram_chat_id: telegramId
            }
        })
        navigate('/wait');
    }
    /**
     * We'll be using an API that provides a bunch of meme images.
     * 
     * Your task:
     * make an API call to "https://api.imgflip.com/get_memes" and save the 
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that comes back is an array)
     */
        return (
            <div>
                {
                    // <h2>{this.state.topText}</h2>
                    // <img src={this.state.randomImg}/>
                    // <h2>{this.state.bottomText}</h2>
                }
                <Container fluid>
                    <Row>
                        <Col className=".col-6 .col-sm-4">
                            <h2>Fill these in to watch the magic✨happen</h2>
                            <br/>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupSender">
                                    <FloatingLabel label="Sender Name">
                                        <Form.Control
                                            type="text"
                                            placeholder="Sender"
                                            value={senderName}
                                            onChange={e => setSenderName(e.target.value) }
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupRecipient">
                                    <FloatingLabel label="Recipient Name">
                                        <Form.Control
                                            type="text"
                                            placeholder="Recipient"
                                            value={recepientName}
                                            onChange={e => setRecepientName(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <FloatingLabel controlId="floatingPrompt" label="Message">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a message here"
                                        style={{ height: '100px' }}
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                    />
                                </FloatingLabel>
                                <br/>
                                <Row className="g-2">
                                    <Col md>
                                        <FloatingLabel controlId="floatingInputGrid" label="Prompt (to generate AI art)">
                                            <Form.Control
                                                type="text"
                                                placeholder="Prompt (to generate AI art)"
                                                value={prompt}
                                                onChange={e => setPrompt(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel
                                            controlId="floatingSelectTheme"
                                        >
                                            <Form.Select aria-label="Floating label select theme"
                                            onChange={e => setTheme(e.target.value)}>
                                                <option>Select a Theme</option>
                                                <option value="1">birthday</option>
                                                <option value="2">encouragement</option>
                                                <option value="3">melancholic</option>
                                                <option value="4">thanksgiving</option>
                                                <option value="5">administrative</option>
                                                <option value="6">festive</option>
                                                <option value="7">love</option>
                                                
                                                theme = {theme} {/* not sure about this part */}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <br/>
                                <br/>
                                <Button color="primary col-12"
                                    onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col className=".col-3 .col-sm-3 template-card-holder">
                            <br/>
                            <br/>
                            <br/>
                            <img
                                src={image}
                                className='img-thumbnail template-card'
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }