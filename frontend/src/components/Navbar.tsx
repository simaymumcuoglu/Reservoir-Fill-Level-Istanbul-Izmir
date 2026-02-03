'use client';

import Link from 'next/link';
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';

export function Navbar() {
  return (
    <BSNavbar bg="primary" variant="dark" expand="md">
      <Container>
        <Link href="/" className="navbar-brand text-white text-decoration-none">
          Reservoir Fill Level
        </Link>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link href="/city/istanbul" className="nav-link text-white">
              Istanbul
            </Link>
            <Link href="/city/izmir" className="nav-link text-white">
              Izmir
            </Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
