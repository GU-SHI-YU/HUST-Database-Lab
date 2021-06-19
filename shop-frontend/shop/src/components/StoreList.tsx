import { Avatar, Collapse, createStyles, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllOrders } from '../api/OrderList';
import Order from '../model/Order';
import Product from '../model/Product';
import Store from '../model/Store';
import { fetchStoreByUser } from '../api/StoreList';

interface StoreListProps {
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

export default function StoreList(props: StoreListProps) {
  const classes = useStyles();
  const [dataList, setDataList] = useState<Store[]>([] as any[]);
  const [opened, setOpened] = useState<number[]>([] as number[]);

  async function update() {
    await fetchStoreByUser(props.u_id)
      .then((ret) => {
      setDataList(ret as Store[]);
    });
  }

  useEffect(() => {
    if (props.u_id === undefined)
      return;
    update();
    // eslint-disable-next-line
  }, [props.u_id]) ;

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
          <AssignmentIndIcon className={classes.message}/>
          <Typography display='inline' className={classes.message}>
            您不是任何商店的管理员
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <List className={classes.root} component='nav'> {
        dataList.map((store: Store, s_index: number) => {
          const labelId = `store-list-label=${s_index}`;
          return (
            <React.Fragment>
              {/* {s_index !== 0 ? <Divider variant='inset' component='li' /> : <CssBaseline />} */}
              <ListItem button={true} onClick={handleClick(s_index)} key={labelId}>
                <ListItemText 
                  primary={store.name}
                  secondary={'店长：' + store.ownerName}
                />
                {opened.indexOf(s_index) !== -1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened.indexOf(s_index) !== -1} timeout='auto' unmountOnExit>
                <List component='div' disablePadding> {
                  store.products.map((product: Product, p_index: number) => {
                    const labelIdP = `product-list-shop${s_index}-label=${p_index}`;
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
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
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
    </React.Fragment>
  )

}