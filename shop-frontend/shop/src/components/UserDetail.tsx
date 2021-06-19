import { Avatar, createStyles, Grid, IconButton, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { updateUser } from '../api/UserDetail';
import User from '../model/User';
import OrderList from './OrderList';

interface UserDetailProps {
  user: User;
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 430,
      },
      marginLeft: theme.spacing(2),
    },
    userInfo: {
      width: 500,
      marginTop: theme.spacing(1),
    },
    orderList: {
      width: 1100,
      height: 'auto',
      marginTop: theme.spacing(1),
    }
  }),
);

export default function UserDetail(props: UserDetailProps) {
  const classes = useStyles();
  const [user, setUser] = useState(props.user);
  const [edit, setEdit] = useState(false);

  const handleChange = (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [prop]: event.target.value});
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleSave = (u_id: number, user: User) => () => {
    updateUser(u_id, user)
      .then(() => {
        setEdit(false);
      });
  }

  useEffect(() => {
    setUser(props.user);
  }, [props.user])

  return (
    <Grid container justify='space-evenly' spacing={3}>
      <Grid item>
        <Paper className={classes.userInfo}>
          <Grid className={classes.root} container spacing={3}>
            <Grid item xs={9}>
              <Avatar src={user.profile}/>
            </Grid>
            <Grid item xs={3}>
              <IconButton 
                onClick={ edit ? handleSave(user.id, user) : handleEdit } 
                color='inherit'
                aria-label='eidt and save'
              >
                { edit ? <SaveIcon /> : <EditIcon /> }
                </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='用户名' 
                value={user.name} 
                onChange={handleChange('name')} 
                InputProps={{
                  readOnly: !edit
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='邮箱' 
                value={user.email} 
                onChange={handleChange('email')}  
                type='email' 
                InputProps={{
                  readOnly: !edit
                }} 
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='电话' 
                value={user.telephone} 
                onChange={handleChange('telephone')} 
                InputProps={{
                  readOnly: !edit
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='密码' 
                value={user.password} 
                onChange={handleChange('password')} 
                type='password' 
                InputProps={{
                  readOnly: !edit
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item justify='center'>
        <Paper className={classes.orderList}>
          <OrderList u_id={user.id} />
        </Paper>
      </Grid>
    </Grid>
    
  )
}