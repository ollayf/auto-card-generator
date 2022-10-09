import React, { useState } from 'react';
import image from "../images/SHINELogoOrangeRed.png"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const Login = ({navigate, setLog, setUid, setUname, setPerms, setTelegram}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit () {
        console.log("Logging in");
        setLog(true);
        console.log(username);
        console.log(password);
        navigate("/main");
    }

    return (
            <div className='div-login'>
                <div>
                    <img
                        src={image}
                        className='div-login-logo'
                    />
                </div>
                <div>
                    <Form>
                        <Form.Group>
                            <FloatingLabel label="Username">
                                <Form.Control
                                    className='loginInput'
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </FloatingLabel>
                            <Form.Group>
                                <FloatingLabel label="Password">
                                    <Form.Control
                                        className='loginInput'
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Form.Group>
                        <Button 
                            className='loginButton'
                            color="primary col-12"
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
}

export default Login;