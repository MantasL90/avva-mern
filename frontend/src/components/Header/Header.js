import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ContactsIcon from "@material-ui/icons/Contacts";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import React, { useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
  },
  brand: {
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.35),
    },
    marginLeft: theme.spacing(2),
    width: "60%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  drawer: { width: "300px" },
  loginLink: { color: "white" },
}));

export default function Header({ setSearch }) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [state, setState] = useState(false);
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const list = () => (
    <List className={classes.drawer}>
      <ListItem>
        <HomeIcon />
        <Link href="/create">Create House</Link>
      </ListItem>
      <ListItem>
        <ContactsIcon />
        <Link href="/contacts">Contacts</Link>
      </ListItem>
      <ListItem>
        <ExitToAppIcon />
        <Link onClick={logoutHandler}>Log out</Link>
      </ListItem>
    </List>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" className={classes.appBar}>
        {userInfo ? (
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link underline="none" href="/" className={classes.brand}>
                AVVA
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={classes.grow}></div>
            <IconButton
              edge="end"
              aria-label="mobile-menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
              {userInfo && `Welcome back, ${userInfo.name}..`}
              {list()}
            </Drawer>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              AVVA
            </Typography>
            <div className={classes.grow}></div>
            <Link href="/login" underline="none" className={classes.loginLink}>
              Login
            </Link>
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}
