import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function Comments() {

    const { id, id2 } = useParams();
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);

    let userRoles = localStorage.getItem("roles");

    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    let warehouseid = JSON.parse(JSON.stringify(id))
    let itemid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fetchItem(warehouseid, itemid);
        fetchComments(warehouseid, itemid);
    }, [warehouseid, itemid])


    async function deleteComment(jid) {
        let url = 'https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments/' + jid;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchComments(warehouseid);
    }
    async function fetchComments(warehouseid, itemid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchItem(warehouseid, itemid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid)
        setItem(JSON.parse(JSON.stringify(result.data)));
    }

    if (item === undefined) {
        return <></>
    }

    return (
        <div>
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>{item.name} komentarai</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("SystemUser") ?
                                <>
                                    <Link to={"/CreateComment/" + warehouseid + '/' + itemid} ><Button variant='success' size='sm' className='my-1'>Pridėti komentarą</Button></Link>

                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/Items/" + warehouseid} ><Button variant='danger' size='sm' className='my-1 m-1'>Grįžti</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vardas</th>
                                <th>Komentaras</th>
                                <th key="actions">Kiti veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{7*item.id}">
                                            <div className='text-center'>
                                            {
                                                userRoles.includes("SystemUser") ?
                                                <>
                                                    <Link to={"/editcomment/" + warehouseid + '/' + itemid + '/' + item.id}><Button variant="info" size="sm">Redaguoti</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteComment(item.id)}>Ištrinti</Button>
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