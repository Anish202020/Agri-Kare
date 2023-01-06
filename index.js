const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5 =require("md5");
let Fname = "";
let Femail = "";
let Fpassword = "";
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));


// mongoose.connect('mongodb://localhost:27017/agri-kareDB');
mongoose.connect('mongodb+srv://admin-anish:Anish1980@atlascluster.yj0pwzj.mongodb.net/agri-kare')
mongoose.set('strictQuery', false);

//#1 Collections
const userSchema = {
    user: {
    type: String
    , required: true
    },
    email: {
    type: String
    , required: true
    },
    password : {
        type: String,
        required: true
    }
  
  }
  
const User = mongoose.model("User",userSchema);

app.get("/user",function(req,res){
    res.render("home",{name:Fname});
});
app.get("/services",function(req,res){
    res.render("services");
})

app.get("/humidity",function(req,res){
    res.render("humidity")
});

app.get("/disease",function(req,res){
    res.render("disease")
});

app.get("/gas",function(req,res){
    res.render("gas")
});

app.get("/water_nutrients",function(req,res){
    res.render("water");
})
//Login
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/user",function(req,res){
    // const user = Fname;
    console.log(req.body)
    const password = md5(req.body.password);
    const email= req.body.email;
    const name = req.body.name;
    Fpassword = password;
    Femail = email;
    Fname = name;
    User.findOne({  email:email}, function (err, docs){
        if(err){
            console.log(err);
        }else{
            if(password===docs.password){
                res.render("home",{name:name});
            }else{
                console.log("Failed")
            }
        }
    });

    
})

// Register
app.get("/register",function(req,res){
    res.render("register")
});

app.post("/login",function(req,res){
    const password = md5(req.body.password);
    const email= req.body.email;
    const name = req.body.name;
    Fpassword = password;
    Femail = email;
    Fname = name;
    const entry = new User({
        user : name,
        email : email,
        password : password
    })
    
    entry.save(function(err,doc){
        if(err){
            console.log(err);
        }else{
            console.log(doc);
            res.redirect("/login");
            // res.render("home",{user : name});
        }
    })
    
});
app.get("/signout",function(req,res){
    res.redirect("/login");
})
app.listen(3000,function(){
    console.log("Server started at port 3000");
})