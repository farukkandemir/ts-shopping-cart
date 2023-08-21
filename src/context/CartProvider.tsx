import { ReactNode, createContext, useContext, useState } from "react";
import CartSection from "../components/CartSection";

type Children = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItemQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItemQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const removeFromCart = (id: number) => {
    return setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id: number) => {
    const itemFound = cartItems.find((item) => item.id === id);

    if (!itemFound) {
      return setCartItems((currentItems) => [
        ...currentItems,
        { id, quantity: 1 },
      ]);
    }
    const updatedItems = cartItems.map((item) =>
      item.id === itemFound.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    return setCartItems(updatedItems);
  };

  const decreaseQuantity = (id: number) => {
    const itemFound = cartItems.find((item) => item.id === id);

    if (!itemFound) {
      return;
    }

    if (itemFound.quantity === 1) {
      const filteredItems = cartItems.filter((item) => item.id !== id);
      return setCartItems(filteredItems);
    }

    const updatedItems = cartItems.map((item) =>
      item.id === itemFound.id
        ? { ...item, quantity: itemFound.quantity - 1 }
        : item
    );

    return setCartItems(updatedItems);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItemQuantity,
        openCart,
        closeCart,
        cartItems,
      }}
    >
      {children}
      <CartSection isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
