import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  purchased?: boolean;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart, purchased }) => {

  function renderButtons() {
    // in recently purchased items pane 
    if (purchased) {
      return <p>{item.amount}x</p>
    }

    // in cart pane
    return (
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    )
  }

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className='information'>
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        {renderButtons()}
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  )
};

export default CartItem;
