import { Navbar as BsNavbar, Button, Container, Nav } from "react-bootstrap";
import { BsCartCheck } from "react-icons/bs";
import { useShoppingCart } from "../context/CartProvider";

type Page = {
  name: string;
  href: string;
};

const Navbar = () => {
  const { totalItemQuantity, openCart } = useShoppingCart();

  const pages: Page[] = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <BsNavbar bg="dark" data-bs-theme="dark" className="py-3 ">
        <Container className="p-0 ">
          <Nav>
            {pages.map(({ name, href }, index) => (
              <Nav.Link key={index} href={href}>
                {name}
              </Nav.Link>
            ))}
          </Nav>
          {totalItemQuantity !== 0 && (
            <>
              <Button variant="light" style={{ position: "relative" }}>
                <BsCartCheck size="1.5rem" onClick={() => openCart()} />

                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(45%, 45%)",
                  }}
                >
                  {totalItemQuantity}
                </div>
              </Button>
            </>
          )}
        </Container>
      </BsNavbar>
    </>
  );
};

export default Navbar;
