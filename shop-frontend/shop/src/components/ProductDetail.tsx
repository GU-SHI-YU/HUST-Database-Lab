import { Avatar, Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import Product from "../model/Product";

interface ProductDetailProps {
  open: boolean;
  product: Product;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    editWindow: {
      height: 'auto',
    },
  }),
);

export default function ProductDetail(props: ProductDetailProps) {
  const {open, product, onClose} = props;
  const classes = useStyles();

  return (
    <Dialog 
      open={open}
      onClose={onClose}
      maxWidth='xs'
      aria-labelledby='product-edit-dialog-title'
      className={classes.editWindow}
    >
      <DialogTitle id='product-edit-dialog-title'>
        商品详情
      </DialogTitle>
      <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar src={product.picture}/>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='商品名' 
                value={product.name} 
                InputProps={{
                  readOnly: true
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='描述' 
                value={product.description} 
                InputProps={{
                  readOnly: true
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='价格' 
                value={product.price} 
                InputProps={{
                  readOnly: true
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='折扣' 
                value={product.discount} 
                InputProps={{
                  readOnly: true
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='类型' 
                value={product.type} 
                InputProps={{
                  readOnly: true
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={ onClose } 
          color='inherit'
          aria-label='cancel'
        >
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  )
}