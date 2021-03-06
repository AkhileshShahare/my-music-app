import { Container, Navbar, NavbarBrand } from "reactstrap";

const Header = () => (
  <Navbar color="light" light expand="md" style={{ minHeight: "10vh" }}>
    <Container>
      <NavbarBrand
        className="cursor-pointer"
        onClick={() => window.location.reload()}
      >
        My Music App
      </NavbarBrand>
    </Container>
  </Navbar>
);

export default Header;
