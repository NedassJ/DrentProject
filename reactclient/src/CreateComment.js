import React, { useState, useEffect, useMemo } from 'react'
import Header from './Header'
import { Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function CreateComment() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const { id, id2 } = useParams();
    const [name, setName] = useState();
    const navigate = useNavigate()
    const [description, setDescription] = useState();
    const [item, setItem] = useState();

    let warehouseid = JSON.parse(JSON.stringify(id))
    let itemid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fetchItem(warehouseid, itemid);
    }, [warehouseid, itemid])

    useMemo(()=>{
        if(item !== undefined)
        {
            fetchComment(warehouseid, itemid,item);
        }
        
    }, [warehouseid, itemid, item])

    async function fetchItem(warehouseid, itemid) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid)
        let resultjson = JSON.parse(JSON.stringify(result.data))
        setItem(resultjson);
    }

    async function fetchComment(warehouseid, itemid, item) {
        let result = await axios.get('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments')
        let resultjson = await JSON.parse(JSON.stringify(result.data))   
    }

    

    if(item === undefined)
    {
        return <></>
    }

    async function addComment(e) {
        e.preventDefault();

        //console.log(betting_price)

        let details = { name, description }
        let json = JSON.stringify(details);

        await axios.post('https://localhost:7082/api/warehouses/' + warehouseid + '/items/' + itemid + '/comments' , json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Comments/"+ warehouseid + '/' + itemid)
            })
            .catch(error => {
                //setErrorMessage(error.response.data);
                console.log(error)
            });
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <h2>Pridėti komentarą dronui {item.name}</h2>
                    <br />
                    <Form onSubmit={addComment}>
                        <fieldset>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Vardas" required />
                            <br />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Komentaras" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Pridėti</button>
                            <Link to={"/Comments/" + warehouseid + '/' + itemid} ><Button variant='danger' className='my-1 m-1'>Grįžti</Button></Link>
                        </fieldset>
                    </Form>

                </div>
            </Container>
            <Footer />
        </div>
    )
}