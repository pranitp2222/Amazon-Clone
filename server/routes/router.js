const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema")
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")

router.get("/getproducts", async(req,res)=>{
    try {
        const productsdata = await Products.find();
        res.json(productsdata)
    } catch (error) {
        console.log("error", error.message);
    }
})

router.get("/getproductsone/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const individuadata = await Products.findOne({id:id});
        res.json(individuadata)
    } catch (error) {
        console.log("error", error.message);
    }
})


router.post("/register", async(req,res) => {
    
    const{fname, email, mobile, password, cpassword} = req.body;

    if(!fname || !email ||!mobile || !password || !cpassword){
        return res.status(422).json({error : "fill the all data"});
    };

    try {
        const preuser = await USER.findOne({email:email});
        if(preuser){
            return res.status(442).json({error:"this user is already exist"})
        }
        else if(password !== cpassword){
            return res.status(422).json({error:"password not match"})
        }
        else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            })

            const storedata = await finalUser.save();
            console.log(storedata);
            return res.status(201).json(storedata);
        }
    } catch (error) {
        console.log("error", error.message);
    }
})

router.post("/login", async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"fill the data properly"})
    };

    try {
        const useremail = await USER.findOne({email:email});
        if(useremail){
            const isMatch = await bcrypt.compare(password, useremail.password);
            console.log(isMatch);

            //token 
            const token  = await useremail.generateAuthtoken();
            //console.log(token);

            res.cookie("eccomerce", token, {
                expires: new Date(Date.now() + 2589000),
                httpOnly:true,
                
            });
            

            if(!isMatch){
                res.status(400).json({error:"invalid Details"})
            }
            else{
                res.status(201).json({success:"Password Match"})
                
            }
        }
        else{
            res.status(400).json({error:"invalid Email Details"})
        }
    } catch (error) {
        res.status(400).json({error:"fill the data properly"}) 
    }
})

router.post("/addcart/:id", authenticate, async(req,res) => {
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value")

        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"Invalid User"});
        }
    } catch (error) {
        res.status(401).json({error:"Invalid User"});
    }
})

router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error);
    }
})

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error);
    }
})


router.delete("/remove/:id", authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
            return cruval.id != id;
        });
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser)
    }
})

router.get("/logout", authenticate, (req,res)=>{
    try {
        req.rootUser.token = req.rootUser.token.filter((curelem)=>{
            return curelem.token !== req.token
        });
        res.clearCookie("eccomerce",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.token);
        console.log("User Logout")
    } catch (error) {
       console.log("Error for user logout") 
    }
})

module.exports = router;