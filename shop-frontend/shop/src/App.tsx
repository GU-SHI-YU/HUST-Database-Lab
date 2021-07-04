import React from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, createStyles, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Slide, TextField, Theme, useScrollTrigger, useTheme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Inbox from '@material-ui/icons/Inbox';
import ProductList from './components/ProductList';
import { useState } from 'react';
import { login } from './api/Login';
import User from './model/User';
import UserDetail from './components/UserDetail';
import StoreList from './components/StoreList';

export interface Props {
  children?: React.ReactElement;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      marginTop: 60,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    avatar: {
      margin: theme.spacing(1),
    }
  }),
);

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function App(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({} as User);
  const [logined, setLogined] = useState(false);
  const [loginWindowOpen, setLoginWindowOpen] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState(0);

  const titles = ['商城', '用户', '管理'];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    login(email, password)
      .then((ret) => {
      if (ret instanceof User) {
        setUser(ret)
      } else {
        setLoginFail(true)
        return Promise.reject();
      }
    }).then(() => {
      setLogined(true);
      setLoginWindowOpen(false);
    });
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLoginOpen = () => {
    setLoginWindowOpen(true);
  }

  const handleLoginClose = () => {
    setLoginWindowOpen(false);
  }

  const handleLoginFailClose = () => {
    setLoginFail(false);
  }

  const handleChangePage = (p_index: number) => () => {
    setPage(p_index);
  }

  const handleLogOut = () => {
    setUser({} as User);
    setLogined(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar 
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
          <Toolbar>
            <IconButton 
              edge='start' 
              className={clsx(classes.menuButton, open && classes.hide)} 
              color='inherit' 
              aria-label="菜单"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                {titles[page]}
            </Typography>
            {logined ? <Avatar alt={user.name} src={user.profile} className={classes.avatar}/> : <Button color="inherit" onClick={handleLoginOpen}>登录</Button>}
            {logined ? <Button color="inherit" onClick={handleLogOut}>登出</Button> : null}
            <Dialog
              open={loginFail}
              onClose={handleLoginFailClose}
              aria-labelledby="login-fail-dialog-title"
              fullWidth={true}
              maxWidth='xs'
            >
              <DialogTitle id="login-fail-dialog-title">登录失败</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  邮箱或密码错误
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLoginFailClose} >关闭</Button>
              </DialogActions>
            </Dialog>
            <Dialog 
              open={loginWindowOpen} 
              onClose={handleLoginClose} 
              aria-labelledby="login-dialog-title"
              fullWidth={true}
              maxWidth='sm'
            >
              <DialogTitle id='login-dialog-title'>登录</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin='normal'
                  id="login-email"
                  label="电子邮箱"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  fullWidth
                />
                <br />
                <TextField
                  margin='normal'
                  id="login-passwd"
                  label="密码"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogin}>登录</Button>
                <Button onClick={handleLoginClose} >取消</Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {titles.map((text, index) => (
              <ListItem button key={text} onClick={handleChangePage(index)}>
                <ListItemIcon><Inbox /></ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <div 
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        > { 
          page === 0 ? 
            <ProductList /> : 
          page === 1 ?
            <UserDetail user={user}/> : 
            <StoreList u_id={user.id}/>
        } </div>
    </div>
  )
}