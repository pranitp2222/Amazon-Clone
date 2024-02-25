import { React, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import Rightheader from "./Rightheader";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();
  //const cLength = account.carts.length;

  const [dropen, setDropen] = useState(false);
  const [text, setText] = useState("")
  const [liopen, setLiopen] = useState(true);

  const {products} = useSelector(state => state.getProductsdata);

  const getdetailsvaliduser = async () => {
    const res = await fetch("http://localhost:8005/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      setAccount(data);
    }
  };

  const handeleopen = () => {
    setDropen(true);
  };

  const handlerclose = () => {
    setDropen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    const res2 = await fetch("http://localhost:8005/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data1 = await res2.json();
    console.log(data1);

    if (res2.status !== 201) {
      console.log("first login");
    } else {
      history("/")
      handleClose();
      toast.success("Logout Successfully done!", {
        position: "top-center"
    })
      setAccount(false);
      
    }
  };

  const getText = (iteams) =>{
    setText(iteams)
    setLiopen(false)
  }

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handeleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handlerclose}>
            <Rightheader logClose={handlerclose} logoutuser={logoutuser}/>
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              {" "}
              <img
                src="https://wildfiresocial.com/wp-content/uploads/2019/01/amazon-logo-white._cb1509666198_.png"
                alt="logo"
              />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" 
            onChange={(e)=>getText(e.target.value)} id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {
              text && <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(products => products.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(products=>(
                    <ListItem>
                    <NavLink to={`/getproductsone/${products.id}`} onClick={()=>setLiopen(true)}>
                      {products.title.longTitle}
                    </NavLink>
                      
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">SignIn</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>Cart</p>
            <ToastContainer/>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem> : ""
            }
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
