import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCartItems: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, clearCartItems }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  /** Sends the cart off to the server. */
  const purchaseItems = async () => {
    const resp = await fetch('api/makePurchase', {
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const response = await resp.json()

    // no response
    if (!resp) return;

    // it failed
    if (!('status' in response)) {
      console.log(response['error']);
      return;
    }

    // clear the cart and exit the cart page since the cart has already been purchased.
    clearCartItems();
  }

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button data-cy='cart-purchase-button' variant='contained' onClick={purchaseItems}>Purchase</Button>
    </Wrapper>
  );
};

export default Cart;
