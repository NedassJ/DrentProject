import React, { useState } from 'react'
import Header from './Header'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router';
import Footer from './Footer';

export default function CreateItem() {

    const navigate = useNavigate()

    const { id } = useParams();
    let warehouseid = JSON.parse(JSON.stringify(id))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [term, setTerm] = useState()

    async function addItem(e) {
        e.preventDefault()

        let details = {name, description, price, term}
        let json = JSON.stringify(details);

        console.log(name, description, price, term)

        await axios.post('https://localhost:7082/api/warehouses/' + warehouseid + '/items', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                let result = JSON.parse(JSON.stringify(response.data))
                console.log(result);
                navigate("/Items/"+warehouseid)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <Header />
            <br />
            <div className="col-sm-6 offset-sm-3">
                <h2>Pridėti droną</h2>
                <br />
                <Container>
                    <Form onSubmit={addItem}>
                        <fieldset>
                            <label htmlFor='name'>Pavadinimas:</label>
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                            <br />
                            <label htmlFor='description'>Aprašymas:</label>
                            <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
                            <br />
                            <label htmlFor='price'>Kaina:</label>
                            <input type="number" name='date' value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                            <br />
                            <label htmlFor='term'>Laikotarpis:</label>
                            <input type="number" name='term' value={term} onChange={(e) => setTerm(e.target.value)} className="form-control" required />
                            <br />
                            
                            <button id="submit" value="submit" className="btn btn-success">Pridėti</button>
                            <Link to={"/Items/"+warehouseid} ><Button variant='danger' className='my-1 m-1'>Grįžti</Button></Link>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div >
    )
}
