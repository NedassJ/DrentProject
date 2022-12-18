import React, { useState } from 'react'
import { Container, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

import Header from './Header'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

export default function CreateWarehouse() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    async function addWarehouse(e) {
        e.preventDefault();

        let details = {name, description}
        let json = JSON.stringify(details);

        await axios.post('https://localhost:7082/api/warehouses', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Warehouses")
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            });
    }

    return (
        <div className="App">
            <Header />
            <br />
            <div className="col-sm-6 offset-sm-3">
                <h2>Pridėti naują sandėlį</h2>
                <br />
                {errorMessage && <Alert variant="danger"> {errorMessage} </Alert>}
                <Container>
                    <Form onSubmit={addWarehouse}>
                        <fieldset>
                            <label htmlFor='name'>Pavadinimas:</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                            <br />
                            <label htmlFor='description'>Aprašymas:</label>
                            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-primary">Pridėti</button>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div>
    )
}
