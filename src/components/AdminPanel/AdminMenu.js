import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const AdminMenu = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin">Dashboard</Nav.Link>
                        <Nav.Link href="/admin/providers">Providers</Nav.Link>
                        <Nav.Link href="/admin/clients">Clients</Nav.Link>
                        <Nav.Link href="/admin/orders">Orders</Nav.Link>
                        <Nav.Link href="/admin/categoris">Categoris</Nav.Link>
                        <Nav.Link href="/admin/services">Services</Nav.Link>
                        <Nav.Link href="/admin/admin-setup">Add Admin</Nav.Link>
                        <Nav.Link href="/admin/withdraws">Withdraws</Nav.Link>
                        <Nav.Link href="/admin/settings">Settings</Nav.Link>
                        <Nav.Link href="/admin/page-settings">Page Settings</Nav.Link>
                        <Nav.Link href="/admin/dispute">Dispute List</Nav.Link>
                        <Nav.Link href="/admin/refund">Refund Requests</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default AdminMenu;