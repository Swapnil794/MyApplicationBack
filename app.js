require('dotenv').config();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
// routes connection
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
// DB connection
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
).then(()=>{console.log("DB is connected");});
// my middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// my routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
//port
const port =process.env.port || 8000;
//starting server
app.listen(port,()=>{console.log(`port is runing at ${port}`);})