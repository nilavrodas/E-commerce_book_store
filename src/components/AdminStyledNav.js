import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function AdminStyledNav() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand>Admin Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/admin/viewbooks">View Inventory</Nav.Link>
                        <Nav.Link href="/admin/addbooks">Add Books</Nav.Link>
                        <NavDropdown title="Accounts " id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Signup
                            </NavDropdown.Item>
                            <NavDropdown.Divider />

                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminStyledNav;