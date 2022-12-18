import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function EditComment(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()

    const { id, id1, id2 } = useParams();
    let warehouseid = JSON.parse(JSON.stringify(id))
    let itemid = JSON.parse(JSON.stringify(id1))
    let commentid = JSON.parse(JSON.stringify(id2))
    
    const [data, setData] = useState([])
    const [description, setDescription] = useState()
    
    useEffect(() => {
        fetchComment(warehouseid, itemid, commentid);
    }, [warehouseid, itemid, commentid])

    async function fetchComment(warehouseid, itemid, commentid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments/' + commentid)
        setData(JSON.parse(JSON.stringify(result.data)));
        setDescription(JSON.parse(JSON.stringify(result.data.description)));
    }

    async function updateComment(e) {
        e.preventDefault()

        let details = { description }
        let json = JSON.stringify(details);

        await axios.put('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments/' + commentid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Comments/" + warehouseid + '/' + itemid)
            })
            .catch(error => {
                
            });

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <h2>Redaguoti komentarą</h2>
                <br />
                <div className="col-sm-4 offset-sm-4">
                    <div style={{ textAlign: 'left' }}>
                        <b>Vardas: </b> {data.name}
                        <br />
                    </div>
                    <Form onSubmit={updateComment}>
                        <fieldset>
                        <label htmlFor='description'>Komentaras:</label>
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
