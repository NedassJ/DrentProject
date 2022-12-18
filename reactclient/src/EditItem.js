import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function EditItem(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()

    const { id, cid } = useParams();
    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(cid))
    

    const [data, setData] = useState([])
    const [description, setDescription] = useState()
    
    useEffect(() => {
        fetchCar(countryid, carid);
    }, [countryid, carid])

    async function fetchCar(countryid, carid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + countryid + '/items/' + carid)
        setData(JSON.parse(JSON.stringify(result.data)));
        setDescription(JSON.parse(JSON.stringify(result.data.description)));
    }

    async function updateCar(e) {
        e.preventDefault()

        let details = { description }
        let json = JSON.stringify(details);

        await axios.put('https://localhost:7082/api/warehouses/' + countryid + '/items/' + carid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Items/" + countryid)
            })
            .catch(error => {
                
            });

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <h2>Redaguoti drono aprašymą</h2>
                <br />
                <div className="col-sm-4 offset-sm-4">
                    <div style={{ textAlign: 'left' }}>
                        <b>Pavadinimas: </b> {data.name}
                        <br />
                    </div>
                    <Form onSubmit={updateCar}>
                        <fieldset>
                        <label htmlFor='description'>Aprašymas:</label>
                            <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Redaguoti</Button>
                        </fieldset>
                    </Form>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
