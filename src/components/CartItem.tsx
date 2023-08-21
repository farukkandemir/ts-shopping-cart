import { Button, Card } from "react-bootstrap";
import storeItems from "../data/items.json";
import { RxCross1 } from "react-icons/rx";
import { useShoppingCart } from "../context/CartProvider";

type CartItem = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItem) => {
  const { removeFromCart } = useShoppingCart();

  const itemInCart = storeItems.find((item) => item.id === id);

  if (!itemInCart) {
    return <></>;
  }

  return (
    <Card>
      <div className="d-flex align-items-center">
        <Card.Img
          variant="top"
          src={itemInCart.imgUrl}
          style={{ objectFit: "cover", width: "100px", height: "100px" }}
        />
        <Card.Body className=" d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <Card.Title>{itemInCart.name}</Card.Title>
            <Card.Text style={{ fontSize: "14px", color: "darkgray" }}>
              ${itemInCart.price}
            </Card.Text>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Card.Text className="m-0">
              ${itemInCart.price * quantity}
            </Card.Text>
            <Button
              size="sm"
              className="p-0 d-flex align-items-center justify-content-center "
              variant="outline-danger"
            >
              <RxCross1
                style={{ color: "red" }}
                onClick={() => removeFromCart(id)}
              />
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CartItem;
