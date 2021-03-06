import { Avatar, Collapse, createStyles, CssBaseline, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllOrders } from '../api/OrderList';
import Order from '../model/Order';
import Product from '../model/Product';

interface OrderListProps {
  u_id: number;
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    inline: {
      display: 'inline',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    message: {
      margin: theme.spacing(1),
    },
  }),
);

export default function OrderList(props: OrderListProps) {
  const classes = useStyles();
  const [dataList, setDataList] = useState<Order[]>([] as any[]);
  const [opened, setOpened] = useState<number[]>([] as number[]);

  async function update() {
    await fetchAllOrders(props.u_id)
      .then((ret) => {
      setDataList(ret as Order[]);
    });
  }

  useEffect(() => {
    if (props.u_id === undefined)
      return;
    update();
    // eslint-disable-next-line
  }, [props.u_id]) ;

  const handleClick = (o_index: number) => () => {
    const currentIndex = opened.indexOf(o_index);
    const newOpened = [...opened];

    if (currentIndex === -1) {
      newOpened.push(o_index);
    } else {
      newOpened.splice(currentIndex, 1);
    }

    setOpened(newOpened);
  }

  if (dataList.length === 0) {
    return (
      <React.Fragment>
        <Grid 
          container 
          justify='space-evenly' 
          direction='column' 
          alignItems='center' 
          spacing={3}
        >
          <AddShoppingCartIcon className={classes.message}/>
          <Typography display='inline' className={classes.message}>
            ??????????????????
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <List className={classes.root} component='nav'> {
        dataList.map((order: Order, o_index: number) => {
          const labelId = `order-list-label=${o_index}`;
          return (
            <React.Fragment>
              {/* {s_index !== 0 ? <Divider variant='inset' component='li' /> : <CssBaseline />} */}
              <ListItem button={true} onClick={handleClick(o_index)} key={labelId}>
                <ListItemText 
                  primary={order.s_name}
                  secondary={'???????????????' + order.id.toString() + ' ?????????' + order.amount.toString()}
                />
                {opened.indexOf(o_index) !== -1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened.indexOf(o_index) !== -1} timeout='auto' unmountOnExit>
                <List component='div' disablePadding> {
                  order.products === undefined ? null :
                  order.products.map((product: Product, p_index: number) => {
                    const labelIdP = `product-list-order${o_index}-label=${p_index}`;
                    return (
                      <React.Fragment>
                        {p_index !== 0 ? <Divider variant='inset' component='li' /> : <CssBaseline />}
                        <ListItem alignItems='flex-start' className={classes.nested} key={labelIdP}>
                          <ListItemAvatar>
                            <Avatar src={product.picture} />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={product.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component='span'
                                  variant='body2'
                                  className={classes.inline}
                                  color='textPrimary'
                                >
                                  {product.type}
                                </Typography>
                                {' - ' + product.description}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    )
                  })
                } </List>
              </Collapse>  
            </React.Fragment>     
          )
        })
      } </List>
      {/* <ProductDetail open={detailOpen} product={curProduct} onClose={handleDetailClose}/> */}
    </React.Fragment>
  )

}