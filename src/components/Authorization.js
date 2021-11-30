import React, {useEffect, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import Login from "./Login";
import Registration from "./Registration";
import {useHistory} from "react-router-dom";
import {login, registration} from "../utils/Constants";
import style from '../css_modules/authorization.module.css';

const Authorization = (props) => {
    const [showModal, setShowModal] = useState(true);
    const toggle = () => {
        setShowModal(!showModal);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationLabel, setValidationLabel] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const handleName = (e) => {
        setUsername(
            e.target.value
        )
    };

    const handleEmail = (e) => {
        setEmail(
            e.target.value
        );
    };

    const handlePassword = (event) => {
        setPassword(
            event.target.value
        )
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(
            e.target.value
        );
    };

    const checkName = () => {
        if (username === '') {
            setValidationLabel(<span style={{color : "red"}}>Enter your name!</span>);
            return false;
        } else {
            setValidationLabel('');
            return true;
        }
    };

    const checkEmail = () => {
        if (email === '') {
            setValidationLabel(<span style={{color : "red"}}>Enter your email!</span>);
            return false;
        } else {
            setValidationLabel('');
            return true;
        }
    };

    const checkPasswords = () => {
        if (password === '' && confirmPassword ==='') {
            setValidationLabel(<span style={{color : "red"}}>Enter your password!</span>);
            return false;
        }
        if (password === confirmPassword) {
            setValidationLabel(<span style={{color : "green"}}>Passwords match</span>);
            setValidPassword(true);
            return true;
        } else {
            setValidationLabel(<span style={{color : "red"}}>The passwords do not match!</span>);
            setValidPassword(false);
            return false;
        }
    };

    const checkAllFieldsOnTrue = () => {
        if (checkName() === true && checkEmail() === true && checkPasswords() === true) {
            setValidationLabel(<span style={{color : "green"}}>Your data has been filled in successfully, press the "Submit"</span>);
        }
    };

    useEffect(() => {
        checkName();
    }, [username]);

    useEffect(() => {
        checkEmail();
    },[email]);

    useEffect(() => {
        checkPasswords();
    },[password,confirmPassword]);

    useEffect(() => {
        checkAllFieldsOnTrue();
    },[username, email, password,confirmPassword]);

    const [activeComponent, setActiveComponent] = useState(login);

    let history = useHistory();
     const handleSubmit = () => {
        if (activeComponent === login) {
            let data = {userEmail: email, password: password};
            let dataFromLocalStorage = JSON.parse(localStorage.getItem(email));
            if (dataFromLocalStorage === null || dataFromLocalStorage.password !== password)  {
                alert("You entered incorrect data. Try again")
            } else {
                sessionStorage.setItem('session', email);
                history.push('/main_page')
            }
        } else {
            if (checkName() === false) {
                return;
            }
            if (checkEmail() === false) {
                return;
            }
            if (checkPasswords() === false) {
                return;
            }
            if (checkAllFieldsOnTrue() === true) {
                return;
            }
            let data = {username: username, userEmail: email, password: password, history : []};
            localStorage.setItem(email, JSON.stringify(data));
            sessionStorage.setItem('session', email);
            history.push('/main_page');
        }
    };

    const selectActiveComponent = (activeComponent) => {
        setActiveComponent(activeComponent);
    };

    const loginRegistrationToggle = () => {
        if (activeComponent === login) {
            return <Login handleEmail={handleEmail} handlePassword={handlePassword}/>;
        } else if (activeComponent === registration) {
            return <Registration checkPasswords={checkPasswords} handleName={handleName} handleEmail={handleEmail} handlePassword={handlePassword} handleConfirmPassword={handleConfirmPassword} validationLabel={validationLabel}/>
        }
    };

    return (
            <div>
                <Modal isOpen={showModal} className='start-modal'>
                    <ModalHeader className='modal-header'>
                        <div>
                            <img className='col-12' src={require(`../Image/emoji.png`)} alt='Emoji'/>
                            <h3>Welcome!<br/>Please sign in / sign up to continue</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className='modal-authorization'>
                        <Container>
                            <Row>
                                <Col xs={6} md={6}>
                                    <Button className='btn-authorization' onClick={() => selectActiveComponent(login)}>Sign in</Button>
                                </Col>
                                <Col xs={6} md={6}>
                                    <Button className='btn-authorization' onClick={() => selectActiveComponent(registration)}>Sign up</Button>
                                </Col>
                            </Row>
                            <Row>
                                {loginRegistrationToggle()}
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter className='modal-footer'>
                        <p className={style.p_modal}>By clicking “Submit”, you agree to us processing your information.</p>
                        <Button color='success' id='submit' className='submit' onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
};

export default Authorization;