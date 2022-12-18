import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function Warehouses() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchWarehouses();
    }, [])

    async function deleteWarehouse(id) {
        let url = 'https://localhost:7082/api/warehouses/' + id;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchWarehouses();
    }

    async function fetchWarehouses() {
        let result = await axios.get('https://localhost:7082/api/warehouses')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <h2>Sandėlių valdymas</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        <Link to={"/CreateWarehouse"} ><Button variant='success' size='sm' className='my-1'>Pridėti sandėlį</Button></Link>
                        <br />
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pavadinimas</th>
                                <th>Aprašymas</th>
                                <th>Kiti veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>                                       
                                        <td>
                                            <Link to={"/editwarehouse/" + item.id}><Button variant="info" size="sm">Redaguoti</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteWarehouse(item.id)}>Ištrinti</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
