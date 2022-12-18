import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function SelectWarehouse() {

    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        fetchWarehouses();
    }, [])

    async function fetchWarehouses() {
        let result = await axios.get('https://localhost:7082/api/warehouses')
        setWarehouses(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <br />
                <h2 >Pasirinkite norimą sandėlį</h2>
                <div className="col-sm-6 offset-sm-3">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Sandėlio pavadinimas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                warehouses.map((item) =>
                                    <tr>
                                        <td><Link to={"/Items/"+item.id} className='link'>{item.name}</Link></td>
                                   
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