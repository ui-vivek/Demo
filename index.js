// Creating Express App to take input form the user and display on the webSite Dynamicaly.
const Express=require('express') 
const path = require("path");  // Path module
const fs=require('fs')
// fs.writeFileSync("Details.txt",'') 
const port=3333;

const db=require('./mongoesh')

const app=Express();
app.use(Express.urlencoded()) // Middleware -> decode the post request 

let arr=[];
// with templet using Pug 
app.set("view engine", "pug");  // set the templet engine
app.set("views", path.join(__dirname, "views")); // Set directry (__dirname)-> means you are at the same directry.

app.get("/", (req, res) => {
    res.render("home",{
        message:"This is the my first pug website ",
        details:arr
    });
  });

// without templet------------------------------
// app.get('/', function(req,res) {              
//     res.sendFile(__dirname + '/home2.html');
//    })
//----------------------------------------------

app.post('/details',(req,res)=>{    //-------> For Post requests 
    // console.log(req.body);
    arr.push(req.body)
    // arr.push({
    //     name:req.body.name,
    //     email:req.body.email,
    //     phone_number:req.body.phone_number
    // })
    //-----------------------------------------> For file system 
    fs.appendFileSync('Details.txt',`  
        Name:${req.body.name},
        Email:${req.body.email},
        Phone Number:${req.body.phone_number}
    `)
    // ------------------------------------------
    return res.redirect('/')
    // return res.redirect('back') //---> Both are same

})

app.listen(port,(err)=>{
    if(err){
        console.log("Sorry ..! There is some Error :( ");
    }
    console.log("Hye..! I there is am running at port ",port)
})


