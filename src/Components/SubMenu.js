import {Navbar, Container} from "react-bootstrap"
import {NavLink} from "react-bootstrap"
export default function SubMenu () {
    return(
        <section className="nav" expand="lg">
            <Navbar className="border d-block w-100">
                <Container>
                    <NavLink className="text-center">Nieuws</NavLink>
                    <NavLink className="text-center">Vermiste personen</NavLink>
                    <NavLink className="text-center">Vermiste kinderen</NavLink>
                </Container>
            </Navbar>
        </section>
    )
}