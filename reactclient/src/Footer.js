import React from 'react'
import { Container } from 'react-bootstrap'
import './footer.css'

export default function Footer() {

    return (
        <div className='footer text-center mt-auto'>
            <Container>
                <footer>
                   <br></br>DRent - dronų sandeliavimas bei nuoma<br></br>2022<br></br>Dronosprendimai.lt<br></br>Janonis Nedas
                </footer>
            </Container>
        </div>
    )
}