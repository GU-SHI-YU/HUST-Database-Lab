import { Avatar, Button, Collapse, createStyles, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllStores, putOrder } from '../api/ProductList';
import Product from '../model/Product';
import Store from '../model/Store';

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
  }),
);

export default function ProductList() {
  const classes = useStyles();
  const [dataList, setDataList] = useState<Store[]>([] as any[]);
  const [opened, setOpened] = useState<number[]>([] as number[]);
  const [nums, setNums] = useState<number[][]>([] as number[][]);
  const [buyed, setBuyed] = useState(false);
  const [buyedContext, setBuyedContext] = useState('');

  async function update() {
    await fetchAllStores()
      .then((ret) => {
      setDataList(ret as Store[]);
    });
  }

  useEffect(() => {
    update();
    // eslint-disable-next-line
  }, []) ;

  useEffect(() => {
    const tempN: number[][] = [];
    for (let i = 0; i < dataList.length; i++) {
      tempN.push([]);
      for (let j = 0; j < dataList[i].products.length; j++) {
        tempN[i].push(0);
      }
    }
    setNums(tempN);
  }, [dataList])

  const handleClick = (s_index: number) => () => {
    const currentIndex = opened.indexOf(s_index);
    const newOpened = [...opened];

    if (currentIndex === -1) {
      newOpened.push(s_index);
    } else {
      newOpened.splice(currentIndex, 1);
    }

    setOpened(newOpened);
  }

  const handleNumChange = (s_index: number, p_index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = [...nums];
    if (event.target.value === '')
      temp[s_index][p_index] = 0;
    else
      temp[s_index][p_index] = parseInt(event.target.value);
    setNums(temp);
  }

  async function createOrder() { 
    let amount: number = 0.0;
    const amounts = await Promise.all(nums.map(async (num: number[], s_index: number) => {
      let body: any = {};
      num.forEach((count: number, p_index: number) => {
        if (count !== 0) {
          const product = dataList[s_index].products[p_index];
          body[product.id] = count;
        }
      });
      if (Object.keys(body).length !== 0) {
        return await putOrder(1, dataList[s_index].id, body)
        .then(json => {
          return json.amount;
        }).catch(error => {
          console.error(error);
        });
      } else {
        return 0;
      }
    }));
    amounts.forEach(value => amount += value);
    return amount;
  }

  const handleBuy = () => async () => {
    await createOrder().then((amount: number) => {
      let context = '';
      context += '总价：' + amount.toString(); 
      if (amount === 0)
        context = '您还没有选择任何商品！'
      setBuyedContext(context);
      setBuyed(true)
    });
  }

  const handleClose = () => () => {
    setBuyed(false);
  }

  return (
    <React.Fragment>
      <List className={classes.root} component='nav'> {
        nums.length !== dataList.length ? null :
        dataList.map((shop: Store, s_index: number) => {
          const labelId = `shop-list-label=${s_index}`;
          return (
            <React.Fragment>
              {/* {s_index !== 0 ? <Divider variant='inset' component='li' /> : <CssBaseline />} */}
              <ListItem button={true} onClick={handleClick(s_index)} key={labelId}>
                <ListItemText 
                  primary={shop.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'
                      >
                        {shop.type}
                      </Typography>
                      {' - ' + shop.description}
                    </React.Fragment>
                  }
                />
                {opened.indexOf(s_index) !== -1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened.indexOf(s_index) !== -1} timeout='auto' unmountOnExit>
                <List component='div' disablePadding> {
                  shop.products.map((product: Product, p_index: number) => {
                    const labelIdP = `product-list-shop${s_index}-label=${p_index}`;
                    const labelIdI = `input-list-shop${s_index}=label=${p_index}`;
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
                          <ListItemSecondaryAction>
                            <TextField
                              id={labelIdI}
                              label="购买数量"
                              value={nums[s_index][p_index]}
                              error={nums[s_index][p_index] < 0 ? true : false}
                              onChange={handleNumChange(s_index, p_index)}
                              type="number"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              margin="normal"
                              variant="outlined"
                            />
                          </ListItemSecondaryAction>
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
      <Grid 
        container
        direction='row'
        alignItems='flex-end'
        justify='flex-end'
      >
        <Button 
          variant="contained" 
          className={classes.button} 
          color='primary'
          size='large'
          onClick={handleBuy()}
        >
          购买
        </Button>      
      </Grid>
      <Dialog
        open={buyed}
        aria-labelledby="buy-dialog-title"
        aria-describedby="buy-dialog-description"
      >
        <DialogTitle id="buy-dialog-title">{"购买成功"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="buy-dialog-description">
            {buyedContext}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose()} >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )

}