import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ItemsList from "./components/ItemsList";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar />
      <Container className="p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<ItemsList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
