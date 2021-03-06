import {Navbar, Container} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {NavLink} from "react-bootstrap"
export default function TopMenu () {
    return(
        <section className="d-flex justify-content-center" expand="lg" id="topmenu">
            <Navbar>
                <Container className="d-flex w-100">
                {/*<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <NavLink as={Link} to="/">Home</NavLink>
                <NavLink as={Link} to="/gezochte-personen/">Gezochte personen</NavLink>    
                <NavLink as={Link} to="/nationale-opsporingslijst/">Nationale opsporingslijst</NavLink>
                <NavLink as={Link} to="/over-deze-pagina/">Over deze pagina</NavLink>
                </Container>
            </Navbar>
        </section>
    )
}