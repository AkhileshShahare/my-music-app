import { Container, Navbar, NavbarBrand } from "reactstrap";

const Footer = () => (
  <Navbar
    style={{ background: "#252729", minHeight: "10vh" }}
    expand="md"
    className="mt-2"
  >
    <Container>
      <NavbarBrand
        className="cursor-pointer"
        onClick={() => window.location.reload()}
      >
        © My Music App
      </NavbarBrand>
    </Container>
  </Navbar>
);

export default Footer;
