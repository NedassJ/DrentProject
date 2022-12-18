import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import Logo from './logo.svg'
import axios from 'axios'

export default function Header() {

    const navigate = useNavigate()
    let username = localStorage.getItem('username')

    let userRoles = localStorage.getItem("roles");

    const [errorMessage, setErrorMessage] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [userName, setUsername] = useState("")

    
    // Modal login
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function checkEmail() {
        let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        if (re.test(email)) {
            setValidEmail(true);
        }
        else {
            setErrorMessage("Invalid email")
            setValidEmail(false)
        }
    }

    async function signIn() {

    
        let details = { userName, password }
        let json = JSON.stringify(details)

        await axios.post('https://localhost:7082/api/login', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                let user = JSON.parse(JSON.stringify(response.data))
                localStorage.setItem("access-token", user.accesToken)
                localStorage.setItem("refresh-token", user.refreshToken)
                localStorage.setItem("username", user.username)
                localStorage.setItem("roles", user.roles)
                localStorage.setItem("id", user.userid)
                handleCloseLogin()
                navigate("/")
            })
            .catch(function (error) {
                if (error.response) {
                    console.warn(error.response.data);
                    setErrorMessage(error.response.data);
                }
            })
    }

    // -------------------------- //

    /*** Modal register ***/

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    async function signUp() {

        checkEmail();
        if (validEmail === false) {
            return false
        }

        let details = { userName, name, surname, email, password}
        let json = JSON.stringify(details)

        await axios.post('https://localhost:7082/api/register', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                handleCloseRegister()
                signIn();
                navigate("/")
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            })
    }

    // -------------------------- //


    function Logout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/' className='logo'><img style={{ width: 80, height: 50 }} className='filter-lightgray' src={Logo} alt="Logo" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/SelectWarehouse' className='link'>Dronų sąrašas</Link></Nav.Link>
                            {
                                localStorage.getItem('access-token') ?
                                    <>
                                        <Nav className="">
                                        </Nav>
                                        {
                                            userRoles.includes("Admin") ?
                                                <>
                                                    <NavDropdown
                                                        className="link"
                                                        menuVariant='dark'
                                                        title={<span className="usernamecolor">Administratoriaus valdymo skydas</span>}>
                                                        <NavDropdown.Item><Link to='/Warehouses' className='link'>Sandėlių sąrašas</Link></NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        
                                                    </NavDropdown>
                                                </>
                                                :
                                                <>
                                                </>
                                        }


                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </Nav>
                        {
                            localStorage.getItem('access-token') ?
                                <></>
                                :
                                <>
                                    <Nav className="mr-auto">
                                        <Nav.Link className='link' onClick={handleShowLogin}>Prisijungti</Nav.Link>
                                        <Nav.Link className='link' onClick={handleShowRegister}>Registruotis</Nav.Link>
                                    </Nav>
                                </>
                        }

                        {
                            localStorage.getItem('access-token') ?
                                <>
                                    <Nav>
                                        <NavDropdown
                                            className="usernamecolor"
                                            title={<span className="usernamecolor">{username && username}</span>}
                                            menuVariant="dark"
                                        >
                                            
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={Logout}>Atsijungti</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                                :
                                null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <>
                <Modal show={showLogin} onHide={handleCloseLogin} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Prisijungimas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <label htmlFor='usernamelog'>Vartotojo vardas:</label>
                            <input type="text" name='usernamelog' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
                            <br />
                            <label htmlFor='password'>Slaptažodis:</label>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                            <br />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signIn}>
                            Prisijungti
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <>
                <Modal show={showRegister} onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Registruotis</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <fieldset>
                                <label htmlFor='username'>Slapyvardis:</label>
                                <input type="text" id='username' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
                                <br />
                                <label htmlFor='name'>Vardas:</label>
                                <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                                <br />
                                <label htmlFor='surname'>Pavardė:</label>
                                <input type="text" id='surname' value={surname} onChange={(e) => setSurname(e.target.value)} className="form-control" required />
                                <br />
                                <label htmlFor='email'>El.paštas:</label>
                                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                                <br />
                                <label htmlFor='password'>Slaptažodis:</label>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                                <br />
                                
                            </fieldset>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signUp}>
                            Registruotis
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div >
    )
}
