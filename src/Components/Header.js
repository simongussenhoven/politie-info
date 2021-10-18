import {Button} from "react-bootstrap"
import Background from '../images/politie2.jpg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Header () {
    return (
        <header className="jumbotron jumbotron-fluid text-light" style={{backgroundImage: "url(" + Background + ")"}}>
            <div className="container p-5">
                <h1 className="display-1">Politie info</h1>
                <h2>Een React app met data representatie van api.politie.nl</h2>
                <AnchorLink href='#topmenu'><Button className="my-3 mx-1">Bekijk info</Button></AnchorLink>
                <a target="_blank" rel="noreferrer" href="https://www.politie.nl/algemeen/open-data.html"><Button variant="outline-light" className="my-3">Over de API</Button></a>
            </div>
        </header>
    )
}