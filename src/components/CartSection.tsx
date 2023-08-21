import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/CartProvider";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type CartProps = {
  isOpen: boolean;
};

const CartSection = ({ isOpen }: CartProps) => {
  const { cartItems, closeCart } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={2}>
          {cartItems.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total : $
            {cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSection;

// show={show} onHide={handleClose}
