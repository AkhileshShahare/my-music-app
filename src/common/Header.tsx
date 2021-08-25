import { Container, Navbar, NavbarBrand } from "reactstrap";

const Header = () => (
  <Navbar color="light" light expand="md">
    <Container>
      <NavbarBrand href="/">My Music App</NavbarBrand>
    </Container>
  </Navbar>
);

export default Header;
