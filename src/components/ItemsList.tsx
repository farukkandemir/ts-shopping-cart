import { Row } from "react-bootstrap";
import products from "../data/items.json";
import Item from "./Item";

const ItemsList = () => {
  return (
    <Row xs={1} md={2} lg={4} style={{ rowGap: "2rem", paddingTop: "1rem" }}>
      {products.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </Row>
  );
};

export default ItemsList;
