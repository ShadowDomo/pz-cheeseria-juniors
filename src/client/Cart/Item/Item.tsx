import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};


const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [dialogOn, setDialogOn] = useState(false);

  useEffect(() => {
    if (dialogOn) {
      console.log('its on')
    }
    if (!dialogOn) {
      console.log('its off');
    }
  }, [dialogOn])
  const handleClick = () => {
    setDialogOn(true);
  }

  const handleClose = () => {
    setDialogOn(false);
  }

  const renderDialog = () => {
    if (!dialogOn) return;
    // setting open to dialogOn wouldn't let me close the dialog
    return (
      <Dialog open onClose={handleClose}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' fontWeight='bold'>
            {item.title}
            {/* <CloseIcon onClick={handleClose} /> */}
          </Box>
        </DialogTitle>
        <Box mx='20px' mb='10px' justifyContent='space-between' display='flex'>
          <Typography variant='subtitle1'>{item.description}</Typography>
        </Box>
        <Box m='0 20px 20px 20px' justifyContent='space-between' display='flex'>
          <div>
            <Typography variant='subtitle2'>Category: {item.category}</Typography>
            <Typography variant='subtitle2'>ID: {item.id}</Typography>
          </div>
          <Typography variant='h5'>${item.price}</Typography>
        </Box>
      </Dialog>
    )
  }

  return (
    <Wrapper>
      <div onClick={handleClick}>
        {renderDialog()}
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <h3>${item.price}</h3>
        </div>
      </div>
      <Button
        onClick={() => handleAddToCart(item)}
        data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
    </Wrapper>
  );

};

export default Item;
