import axios from 'axios';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function StyledNav() {
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate("/")
            }
        }).catch(error => {
            console.log(error)
        });

    }
    let authButtons = '';
    // authButtons = (
    //     <NavDropdown title="Login/Signup" id="basic-nav-dropdown">
    //         <NavDropdown.Item href="/login">Login</NavDropdown.Item>
    //         <NavDropdown.Item href="/signup">
    //             Signup
    //         </NavDropdown.Item>

    //     </NavDropdown>)
    if (!localStorage.getItem('auth_token')) {
        authButtons = (
            <NavDropdown title="Login/Signup" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">
                    Signup
                </NavDropdown.Item>

            </NavDropdown>)
    } else (
        authButtons = (
            <Button type="submit" onClick={logoutSubmit} className='nav-link btn btn-danger btn-sm text-white'>Logout</Button>

        )
    )
    return (
        <Navbar bg="warning" expand="lg">
            <Container fluid>
                <Navbar.Brand>Ebooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/books">Books</Nav.Link>

                        {authButtons}

                    </Nav>
                    {/* <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default StyledNav;