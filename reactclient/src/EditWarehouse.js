import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function EditWarehouse(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()
    
    const { id } = useParams();
    let jid = JSON.parse(JSON.stringify(id))

    const [data, setData] = useState([])
    const [description, setDescription] = useState([])
    

    useEffect(() => {
        fetchWarehouse(jid);
    }, [jid])

    async function fetchWarehouse(jid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + jid)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function updateWarehouse(e) {
        e.preventDefault()

        let details = {description}
        let json = JSON.stringify(details);

        await axios.put('https://localhost:7082/api/warehouses/' + jid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Warehouses")
            })
            .catch(error => {
                console.log(error.response.data);
            });

    }

    return (
        <div className="App">
            <Header />
            <Container>
                <Form onSubmit={updateWarehouse}>
                    <h2>Redaguoti sandėlio informaciją</h2>
                    <br />
                    <div className="col-sm-6 offset-sm-3">
                        <fieldset>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={data.description} className="form-control" required />
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Redaguoti</Button>
                        </fieldset>
                    </div>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}
