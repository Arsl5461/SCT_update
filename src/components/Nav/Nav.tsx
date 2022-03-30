import React from 'react';
import clsx from 'clsx';
import { Link,NavLink } from 'react-router-dom';
import Image from 'material-ui-image';
import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// import CashImage from '../../assets/img/shiba_logo.svg';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import styled from "styled-components";


import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';
import Dropdown from './Dropdown';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: 'var(--white)',
    'background-color': "transparent",
    'backdrop-filter': "blur(2px)",
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    height:'50px',
    // marginBottom: '3rem',
    fontFamily: 'Amarante,cursive',
    // z-index: 1000,
    // position: StaticRange,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
    // minHeight: '80px'
  },
  toolbarTitle: {
    fontFamily: '"Gilroy"',
    fontSize: '30px',
    flexGrow: 1,
  },
  form:{
width:"120px",
marginRight:"10px",
color:"black",
  },
  link: {
    textTransform: 'uppercase',
    color: 'wheat',
    fontSize: '14px',
    margin: theme.spacing(1, 1),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: 'var(--white)',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
          {/* <Image color="transparent" style={{ width: '50px', height: '50px', paddingTop: '0px', marginRight:'10px' }} src={CashImage} /> */}
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              {/* <a className={ classes.brandLink } href="/">2omb Finance</a> */}
              <Link to="/" color="inherit" style={{color:"#ffffff"}} className={classes.brandLink}>
              Tomb Finance
              </Link>
            </Typography>
            <Box mr={13}>
              <NavLink  style={{fontSize:"18px"}} color="color" to="/" className={classes.link}>
                Home
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/cemetry" className={classes.link} activeClassName="active">
                Cemetery
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/masonry" className={classes.link} activeClassName="active">
                Mosonry
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/pit" className={classes.link} activeClassName="active">
                Pit
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/rebates" className={classes.link} activeClassName="active">
                Rebates
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/treasury" className={classes.link} activeClassName="active" >
                Treasury
              </NavLink>
              <NavLink style={{fontSize:"18px"}} color="textPrimary" to="/treasury" className={classes.link} activeClassName="active" >
                Docs
              </NavLink>

              {/* <Link style={{fontSize:"15px"}} color="textPrimary" to="/treasury" className={classes.link}>
                Docs
              </Link> */}
              {/* <Link color="textPrimary" to="/treasury" className={classes.link}>
                Treasury
              </Link>
              <a href="/" target="_blank" className={classes.link}>
                Vaults
              </a> */}
              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              {/* <a href="https://beluga.fi" target="_blank" className={classes.link}>
                Vaults
              </a> */}
              {/* <a href="https://snapshot.org/#/forgiving.forg.eth" target="_blank" className={classes.link}>
                Governance
              </a> */}
              {/* <a href="https://docs.sct.finance" target="_blank" className={classes.link} >
                Docs
              </a> */}
            </Box>
              <FormControl fullWidth className={classes.form}>
  <InputLabel id="demo-simple-select-label">B_subdomain</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"

    // label="Age"
    // onChange={}
  >
    <MenuItem value={10}>to A_subdomain</MenuItem>
    <MenuItem value={20}>to B_subdomain</MenuItem>
    <MenuItem value={30}>to C_subdomain</MenuItem>
  </Select>
</FormControl>
<i className="icon"></i>
            <AccountButton text="Connect Wallet" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Sct Finance
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Cemetry" to="/cemetry" />
                <ListItemLink primary="Mosonory" to="/masonry" />
                <ListItemLink primary="Pit" to="/pit" />
                <ListItemLink primary="Rebates" to="/rebates" />
                <ListItemLink primary="Treasury" to="/treasury" />
                {/* <ListItemLink primary="Masonry" to="/masonry" />
                <ListItemLink primary="Pit" to="/pit" />
                <ListItemLink primary="SBS" to="/sbs" />
                <ListItemLink primary="Liquidity" to="/liquidity" />
                <ListItemLink primary="Regulations" to="/regulations" /> */}
                {/* <ListItem button component="a" href="https://beluga.fi">
                  <ListItemText>Vaults</ListItemText>
                </ListItem> */}
                {/* <ListItem button component="a" href="https://snapshot.org/#/forgiving.forg.eth">
                  <ListItemText>Governance</ListItemText>
                </ListItem> */}
                <ListItem button component="a" href="https://docs.sct.finance">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
                {/* <ListItem button component="a" href="https://2omb.finance">
                  <ListItemText>2omb</ListItemText>
                </ListItem> */}
               
  

                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="My Wallet"/>
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
