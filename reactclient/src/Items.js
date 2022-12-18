import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function Items() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState([]);

    let warehouseid = JSON.parse(JSON.stringify(id))
    let userRoles = localStorage.getItem("roles");

    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    useEffect(() => {
        fetchWarehouse(warehouseid);
        fetchItems(warehouseid);
    }, [warehouseid])

    


    async function deleteItem(jid) {
        let url = 'https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + jid;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchItems(warehouseid);
    }

    async function fetchItems(warehouseid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchWarehouse(warehouseid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid)
        setWarehouse(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>Sandėlys : {warehouse.name}</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("Seller") ?
                                <>
                                    <Link to={"/CreateItem/" + warehouseid} ><Button variant='success' size='sm' className='my-1'>Pridėti droną</Button></Link>
                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/SelectWarehouse"} ><Button variant='danger' size='sm' className='my-1 m-1'>Grįžti</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th key="Name">Pavadinimas</th>
                                <th key="Description">Aprašymas</th>
                                <th key="Price">Kaina</th>
                                <th key="Term">Laikotarpis</th>
                                <th key="actions">Kiti veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td style={{ verticalAlign: "middle" }} key="{2*item.id}">{item.name}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{3*item.id}">{item.description}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{4*item.id}">{item.price}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{5*item.id}">{item.term}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{7*item.id}">
                                            <div className='text-center'>
                                                <Link to={"/Comments/" + warehouseid + '/' + item.id}><Button variant="success" size="sm">Komentarai</Button></Link>

                                            {
                                                userRoles.includes("Admin") ?
                                                <>
                                                    <Link to={"/edititem/" + warehouseid + '/' + item.id}><Button variant="info" size="sm">Redaguoti</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}>Ištrinti</Button>
                                                </>
                                                :
                                                <></>
                                            }

                                                
                                            </div>
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
