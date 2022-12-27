import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function AdminStyledNav() {
    return (
        <Navbar bg="warning" expand="lg">
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
                        <Nav.Link href="/admin/addbooks">Customers</Nav.Link>
                        <Nav.Link href="/admin/login">Login</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminStyledNav;