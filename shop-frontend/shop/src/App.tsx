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
import Store from './model/Store';
import { useState } from 'react';
import { login } from './api/Login';
import User from './model/User';
import UserDetail from './components/UserDetail';

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

const shops: Store[] = [
  {
    id: 1,
    name: '食品店',
    description: '一家食品店',
    type: '食品',
    products: [
      {
        id: 1,
        name: '麻花',
        description: '天津产麻花',
        type: '食品',
        price: 10.0,
        discount: 1.0,
        num: 2,
        picture: 'http://ali.xinshipu.cn/20180114/original/1515903253660.jpg'
      },
      {
        id: 2,
        name: '包子',
        description: '天津产包子',
        type: '食品',
        price: 15.0,
        discount: 0.8,
        num: 3,
        picture: 'http://image.uc.cn/s/wemedia/s/upload/2020/c0010a8b6bc212369bb35cba223393ee.jpg'
      },
    ],
  },
  {
    id: 2,
    name: '服装店',
    description: '一家服装店',
    type: '服装',
    products: [
      {
        id: 3,
        name: '西装',
        description: '美国产西装',
        type: '服装',
        price: 1000.0,
        discount: 1.0,
        num: 1,
        picture: 'https://www.wgnds.com/wp-content/uploads/2020/03/%E5%8D%95%E6%8E%92%E6%89%A3%E8%A5%BF%E8%A3%85-705x1024.jpg'
      },
      {
        id: 4,
        name: '连衣裙',
        description: '日本产连衣裙',
        type: '服装',
        price: 150.0,
        discount: 0.85,
        num: 2,
        picture: 'https://s5.mogucdn.com/mlcdn/55cf19/210416_1akgd8b39bi8796bi069a351i30i5_640x960.jpg'
      },
    ],
  },
]

export default function App(props: Props) {
  shops[0].id = 1;
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
            null
        } </div>
    </div>
  )
}