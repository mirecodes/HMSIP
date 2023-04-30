import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';

const NavigationBar = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="sm">
				<Container fluid>
					<Navbar.Brand href="/">
						<img alt="hello?" src="img/hmsip_logo.png" className="d-inline-block align-top" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/form">Form</Nav.Link>
							<Nav.Link href="/bills">Bills</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
