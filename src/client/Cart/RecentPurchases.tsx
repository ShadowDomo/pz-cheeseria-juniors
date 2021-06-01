import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';

type Props = {
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCartItems: () => void;
};

const RecentPurchases: React.FC<Props> = ({ addToCart, removeFromCart, clearCartItems }) => {
  const [recentPurchases, setRecentPurchases] = useState<CartItemType[]>([])

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  // could have used react-query like that in App.tsx, however I'm not at all familiar with it currently
  useEffect(() => {
    let mounted = true;

    // fetch the recent purchase
    (async () => {
      const purchases: CartItemType[] = await (await fetch('api/recentPurchases')).json();
      if (mounted) {
        setRecentPurchases(purchases);
      }
      // TODO handle error where 
    })()
    return () => {
      mounted = false;
    }
  }, [])

  return (
    <Wrapper>
      <h2>Your recent purchases</h2>
      {recentPurchases.length === 0 ? <p>No recent purchases.</p> : null}
      {recentPurchases.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          purchased={true}
        />
      ))}
      <h2>Total: ${calculateTotal(recentPurchases).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default RecentPurchases;
