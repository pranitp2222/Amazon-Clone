import React, { useContext } from 'react'
import { Avatar, Divider } from '@mui/material'
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from 'react-router-dom';
import "./rightheader.css"
import LogoutIcon from '@mui/icons-material/Logout';
const Rightheader = ({logClose, logoutuser}) => {

    const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
        {account ? 
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
           : 
            <Avatar className="avtar"></Avatar>
          }
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={()=>logClose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Shop by Category</NavLink>
            <Divider style={{ width: "100%", marginLeft: -20 }} />
            <NavLink to="/">Today's Deals</NavLink>
            {
                account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
            }
            <Divider style={{ width: "100%", marginLeft: -20 }} />
            <div className="flag">
                    <NavLink to="/">Settings</NavLink>
                    {/* <img src="" alt="india flag" style={{ width: 35, marginLeft: 10 }} /> */}
            </div>
            {
                account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                        </div>
                        : <NavLink to="/login">Sign in</NavLink>
            }
        </div>
      </div>
    </>
  )
}

export default Rightheader
