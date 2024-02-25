const mongoose = require("mongoose");
const db = process.env.DATABASE

mongoose.connect(db).then(()=>console.log("DataBase Connected")).catch((error)=>console.log("error", error.message))