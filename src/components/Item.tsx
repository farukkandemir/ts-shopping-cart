import { Button, Card, Col, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/CartProvider";

type ItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const Item = ({ id, name, price, imgUrl }: ItemProps) => {
  const {
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Col key={id}>
      <Card>
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column gap-4">
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>{name}</Card.Title>
            <Card.Text>${price}</Card.Text>
          </div>
          {quantity > 0 ? (
            <Stack gap={2} className="align-items-center ">
              <Stack
                direction="horizontal"
                gap={2}
                className="align-self-center "
              >
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
                <span>{quantity} in cart</span>
                <Button onClick={() => increaseQuantity(id)}>+</Button>
              </Stack>
              <Button variant="danger" onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            </Stack>
          ) : (
            <Button variant="primary" onClick={() => increaseQuantity(id)}>
              Add To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Item;
