import React, { useContext } from "react";
import './buynow.css'
import { LoginContext } from "../context/ContextProvider";
const Option = ({deletedata, get}) => {

  const { account, setAccount } = useContext(LoginContext);


  const removedata = async(req,res) =>{
    try {
      const res = await fetch(`http://localhost:8005/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);
    if(res.status === 400 || !data){
      console.log("error");
    }
    else{
      console.log("user added");
      get();
      setAccount(data);
    }
    } catch (error) {
      
    }
  }


  return (
    <div className="add_remove_select">
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={()=>removedata(deletedata)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save Or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
    </div>
  );
};

export default Option;
