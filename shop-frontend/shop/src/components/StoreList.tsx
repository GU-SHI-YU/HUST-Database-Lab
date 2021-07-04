import { Avatar, Button, Collapse, createStyles, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, MenuItem, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Product from '../model/Product';
import Store from '../model/Store';
import { addItem, deleteItem, deleteStore, fetchStoreByUser, fetchTypes, updateItem, updateStore } from '../api/StoreList';
import ProductDetail from './ProductDetail';

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
    options: {
      marginTop: theme.spacing(1),
      height: 60
    },
    editWindow: {
      height: 'auto',
    },
  }),
);

export default function StoreList(props: StoreListProps) {
  const classes = useStyles();
  const [dataList, setDataList] = useState<Store[]>([] as any[]);
  const [opened, setOpened] = useState<number[]>([] as number[]);
  const [editProduct, setEditProduct] = useState(false);
  const [curProduct, setCurProduct] = useState<Product>({} as Product);
  const [curStore, setCurStore] = useState<Store>({} as Store);
  const [delProduct, setDelProduct] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({} as Product);
  const [typeList, setTypeList] = useState<string[]>([] as string[]);
  const [editStore, setEditStore] = useState(false);
  const [delStore, setDelStore] = useState(false);

  async function getDataList() {
    await fetchStoreByUser(props.u_id)
      .then((ret) => {
      setDataList(ret as Store[]);
    });
  }

  async function getTypeList() {
    await fetchTypes()
      .then((ret) => {
        setTypeList(ret as string[]);
      });
  }

  useEffect(() => {
    if (props.u_id === undefined)
      return;
    getDataList();
    getTypeList();
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

  const handleProductEdit = (s_index: number, p_index: number) => () => {
    setCurStore(dataList[s_index]);
    setCurProduct(dataList[s_index].products[p_index]);
    setEditProduct(true);
  }

  const handleProductEditClose = () => {
    setEditProduct(false);
  }

  const handleProductSave = () => {
    updateItem({
      id: curProduct.id, 
      name: curProduct.name,
      description: curProduct.description,
      price: curProduct.price,
      picture: curProduct.picture,
      type: curProduct.type,
      discount: curProduct.discount, 
      stack: curProduct.stack,
    }).then(async () => {
      await getDataList();
      setEditProduct(false);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleProductDel = (s_index: number, p_index: number) => () => {
    setCurStore(dataList[s_index]);
    setCurProduct(dataList[s_index].products[p_index]);
    setDelProduct(true);
  }

  const handleProductDelExc = () => {
    deleteItem({
      id: -1,
      productId: curProduct.id,
      storeId: curStore.id,
      discount: 0,
      stack: 0,
    }).then(async () => {
      await getDataList();
    }).catch(error => {
      console.error(error);
    });
  }

  const handleProductDelClose = () => {
    setDelProduct(false);
  }

  const handleProductChange = (prop: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurProduct({...curProduct, [prop]: (prop in ['discount', 'price', 'stack'] ? event.target.valueAsNumber : event.target.value)})
  }

  const handleDetail = (s_index: number, p_index: number) => () => {
    setCurProduct(dataList[s_index].products[p_index]);
    setDetailOpen(true);
  }

  const handleDetailClose = () => {
    setDetailOpen(false);
  }

  const handleAdd = (s_index: number) => () => {
    setCurStore(dataList[s_index])
    setNewProduct({} as Product);
    setAddProduct(true);
  }

  const handleAddSave = () => {
    addItem(curStore.id, typeList.indexOf(newProduct.type), {
      id: -1,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      picture: newProduct.picture,
      discount: newProduct.discount,
      stack: newProduct.stack,
    }).then(async () => {
      await getDataList();
      setAddProduct(false);
    }).catch(error => {
      console.error(error);
    })
  }

  const handleAddClose = () => {
    setAddProduct(false);
  }

  const handleAddProductChange = (prop: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(prop);
    setNewProduct({...newProduct, [prop]: (prop in ['discount', 'price', 'stack'] ? event.target.valueAsNumber : event.target.value)})
  }

  const handleEditStore = (s_index: number) => () => {
    setCurStore(dataList[s_index]);
    setEditStore(true);
  }

  const handleEditStoreSave = () => {
    updateStore(curStore.id, {
      id: curStore.id,
      name: curStore.name,
      description: curStore.description,
      ownerId: -1,
    }).then(async () => {
      await getDataList();
      setEditStore(false);
    }).catch(error => {
      console.error(error);
    })
  }

  const handleEditStoreClose = () => {
    setEditStore(false);
  }

  const handleDelStore = (s_index: number) => () => {
    setCurStore(dataList[s_index]);
    setDelStore(true);
  }

  const handleDelStoreExc = () => {
    deleteStore(curStore.id)
      .then(async () => {
        await getDataList();
        setDelStore(false);
      }).catch(error => {
        console.error(error);
      })
  }

  const handleDelStoreClose = () => {
    setDelStore(false);
  }

  const handleStoreChange = (prop: keyof Store) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurStore({...curStore, [prop]: event.target.value});
  }

  if (dataList.length === 0) {
    return (
      <React.Fragment>
        <Paper className={classes.message}>
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
        </Paper>
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
                <List component='div' disablePadding> 
                { store.products === undefined ? null :
                  store.products.map((product: Product, p_index: number) => {
                    const labelIdP = `product-list-shop${s_index}-label=${p_index}`;
                    return (
                      <React.Fragment>
                        {p_index !== 0 ? <Divider variant='inset' component='li' /> : <CssBaseline />}
                        <ListItem alignItems='flex-start' className={classes.nested} key={labelIdP} button onClick={handleDetail(s_index, p_index)}>
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
                            <IconButton onClick={handleProductEdit(s_index, p_index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleProductDel(s_index, p_index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    )
                  })
                } 
                  <Divider variant='inset' component='li' />
                  <ListItem alignItems='flex-start' className={clsx(classes.nested, classes.options)} key={`store-list-options=${s_index}`}>
                    <ListItemSecondaryAction>
                      <IconButton onClick={handleAdd(s_index)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton>
                        <EditIcon onClick={handleEditStore(s_index)}/>
                      </IconButton>
                      <IconButton>
                        <DeleteIcon onClick={handleDelStore(s_index)}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Collapse>  
            </React.Fragment>     
          )
        })
      } </List>
      <Dialog 
        open={editProduct}
        maxWidth='xs'
        aria-labelledby='product-edit-dialog-title'
        className={classes.editWindow}
      >
        <DialogTitle id='product-edit-dialog-title'>
          编辑商品
        </DialogTitle>
        <DialogContent>
            <Grid className={classes.editWindow} container spacing={2}>
              <Grid item xs={12}>
                <Avatar src={curProduct.picture}/>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='商品名' 
                  value={curProduct.name} 
                  onChange={handleProductChange('name')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='描述' 
                  value={curProduct.description} 
                  onChange={handleProductChange('description')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='价格' 
                  value={curProduct.price} 
                  onChange={handleProductChange('price')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='库存' 
                  value={curProduct.stack} 
                  onChange={handleProductChange('stack')} 
                  type='number' 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='折扣' 
                  value={curProduct.discount} 
                  onChange={handleProductChange('discount')} 
                  type='number' 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={ handleProductSave } 
            color='inherit'
            aria-label='save'
          >
            保存
          </Button>
          <Button 
            onClick={ handleProductEditClose } 
            color='inherit'
            aria-label='cancel'
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={addProduct}
        maxWidth='xs'
        aria-labelledby='product-add-dialog-title'
        className={classes.editWindow}
      >
        <DialogTitle id='product-add-dialog-title'>
          添加商品
        </DialogTitle>
        <DialogContent>
            <Grid className={classes.editWindow} container spacing={2}>
              <Grid item xs={12}>
                <Avatar src={newProduct.picture}/>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='商品名' 
                  required
                  value={newProduct.name} 
                  onChange={handleAddProductChange('name')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='描述' 
                  required
                  value={newProduct.description} 
                  onChange={handleAddProductChange('description')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='价格' 
                  required
                  value={newProduct.price} 
                  onChange={handleAddProductChange('price')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='库存' 
                  required
                  value={newProduct.stack} 
                  onChange={handleAddProductChange('stack')} 
                  type='number' 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='折扣' 
                  required
                  value={newProduct.discount} 
                  onChange={handleAddProductChange('discount')} 
                  type='number' 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='类型' 
                  required
                  select
                  value={newProduct.type} 
                  onChange={handleAddProductChange('type')} 
                  type='text'
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {typeList.map((type) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                  )})}
                </TextField>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={ handleAddSave } 
            color='inherit'
            aria-label='save'
          >
            保存
          </Button>
          <Button 
            onClick={ handleAddClose } 
            color='inherit'
            aria-label='cancel'
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={delProduct}
        aria-labelledby='product-del-dialog-title'
      >
        <DialogTitle id='product-del-dialog-title'>确认删除</DialogTitle>
        <DialogContent>
          确认要删除产品吗？
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={ handleProductDelExc } 
            color='inherit'
            aria-label='del'
          >
            确认
          </Button>
          <Button 
            onClick={ handleProductDelClose } 
            color='inherit'
            aria-label='cancel'
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={editStore}
        maxWidth='xs'
        aria-labelledby='store-edit-dialog-title'
        className={classes.editWindow}
      >
        <DialogTitle id='store-edit-dialog-title'>
          编辑商店
        </DialogTitle>
        <DialogContent>
            <Grid className={classes.editWindow} container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  label='商店名' 
                  value={curStore.name} 
                  onChange={handleStoreChange('name')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='描述' 
                  value={curStore.description} 
                  onChange={handleStoreChange('description')} 
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={ handleEditStoreSave } 
            color='inherit'
            aria-label='save'
          >
            保存
          </Button>
          <Button 
            onClick={ handleEditStoreClose } 
            color='inherit'
            aria-label='cancel'
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={delStore}
        aria-labelledby='store-del-dialog-title'
      >
        <DialogTitle id='store-del-dialog-title'>确认删除</DialogTitle>
        <DialogContent>
          确认要删除商店吗？
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={ handleDelStoreExc } 
            color='inherit'
            aria-label='del'
          >
            确认
          </Button>
          <Button 
            onClick={ handleDelStoreClose } 
            color='inherit'
            aria-label='cancel'
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <ProductDetail open={detailOpen} product={curProduct} onClose={handleDetailClose}/>
    </React.Fragment>
  )

}