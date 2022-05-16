require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const app=express();
const db=require('./config/keys').MongoURI;
const User=require('./model/User');
const Movies=require('./model/Movies');
const Admin=require('./model/admin');
const { response } = require('express');
const res = require('express/lib/response');
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log("Database Connected"))
.catch(err=>console.log(err));
const users=[];
const user={};
let movies=[];
const movie={};
//view engine setter
app.set('view engine','ejs');
app.set('views','views');

//for accessing data through req.body object
app.use('/',express.urlencoded({extended:false}));

//for setting location of static files
app.use('/',express.static(path.join(__dirname,'/public')))

// utitlity functions

    //check user exist or not
const IsUserExist=(user,email,password)=>{
   return user.email===email && user.password===password;
}

    //add movie to list
// const AddMovie=(MovieName,LeadActor,LeadActress,URL,Category)=>{
//     Movies.create({
//         "MovieName":`${MovieName}`,
//         "LeadActor":`${LeadActor}`,
//         "LeadActress":`${LeadActress}`,
//         "URL":`${URL}`,
//         "Category":`${Category}`,
//     })
//     .then(response=>{
//         console.log(response);
//         res.redirect('/Home');
//     })
//     .catch(err=>{
//         console.log(err);
//         res.redirect('/err');
//     })
//     console.log(movies);
// }

//Post requests
app.post('/edit',async (req,res)=>{
 console.log(req.body.oldname);
 console.log(req.body.oldactor);
 console.log(req.body.oldactress);
 console.log(req.body.oldurl);
 console.log(req.body.newname);
 console.log(req.body.newactor);
 console.log(req.body.newactress);
 console.log(req.body.newurl);

 const query={
    "MovieName":`${req.body.oldname}`
 };
 const update={
    "MovieName":`${req.body.newname}`,
    "LeadActor":`${req.body.newactor}`,
    "LeadActress":`${req.body.newactress}`,
    "URL":`${req.body.newurl}`,
 }
const option={
    "upsert": false
}
 Movies.updateOne(query,update,option)
 .then(result=>{
    const { matchedCount, modifiedCount } = result;
    if(matchedCount && modifiedCount) {
      console.log(`Successfully updated the item.`)
      movies=  Movies.find({});
    }
 }).catch(err=>console.log(err));
 
 console.log(movies)
 res.json([{
    movies
 }])
});

app.post('/delete',(req,res)=>{
    console.log(req.body.oldname);
 console.log(req.body.oldactor);
 console.log(req.body.oldactress);
 console.log(req.body.oldurl);
 const query={
    "MovieName":`${req.body.oldname}`,
    "LeadActor":`${req.body.oldactor}`,
    "LeadActress":`${req.body.oldactress}`,
    "URL":`${req.body.oldurl}`,
 }
 Movies.deleteOne(query).then(result=>{
     console.log(result)
     res.json([{
        name_received:req.body.name,
        college_received:req.body.designation,
    }]);
 }).catch(err=>console.log(err));
});


app.post('/CreateAccount/details',(req,res)=>{
        User.create({
            "Name":`${req.body.ns}`,
            "Email":`${req.body.email}`,
            "Password":`${req.body.password}`
        })
        .then(response=>{
            console.log(response);
            res.redirect('/Home');
        })
        .catch(err=>
            {
            console.log(err)
            res.render('err');
        })
})

app.post('/ExistingAccount/details',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({
        "Email":`${req.body.email}`,
        "Password":`${req.body.password}`
    })
    .then(user=>{
        if(user.Email===email && user.Password===password)
        {
            res.redirect('/Home');
        }
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/err');
    })
});

app.post('/AddMovie',(req,res)=>{
    Movies.create({
        "MovieName":`${req.body.mn}`,
        "LeadActor":`${req.body.la}`,
        "LeadActress":`${req.body.lac}`,
        "URL":`${req.body.url}`,
        "Category":`${req.body.category}`,
    })
    .then(response=>{
        console.log(response);
        res.redirect('/Home');
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/err');
    })
    console.log(movies);
})

app.post('/Admin/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    Admin.findOne({
        "Email":`${req.body.email}`,
        "Password":`${req.body.password}`
    })
    .then(user=>{
        if(user.Email===email && user.Password===password)
        {
            res.redirect('/admin');
        }
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/err');
    })
})

app.post('/request',(req,res)=>{
    res.json([{
        name_received:req.body.name,
        college_received:req.body.designation,
    }]);
})

app.post('/admin/AddMovie',(req,res)=>{
    Movies.create({
        "MovieName":`${req.body.mn}`,
        "LeadActor":`${req.body.la}`,
        "LeadActress":`${req.body.lac}`,
        "URL":`${req.body.url}`,
        "Category":`${req.body.category}`,
    })
    .then(response=>{
        console.log(response);
        res.redirect('/admin');
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/err');
    })
    console.log(movies);
})


//get requests
app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/err',(req,res)=>{
    res.render('err');
})

app.get('/Home',async (req,res)=>{
    movies= await Movies.find({});
    res.render('user/index',{movies});
})

app.get('/CreateAccount',(req,res)=>{
    res.render('user/createaccount');
})

app.get('/Login',(req,res)=>{
    res.render('login');
})

app.get('/AddMovie',(req,res)=>{
    res.render('addmovie');
})

app.get('/Admin/login',(req,res)=>{
    res.render('./admin/login');
})

app.get('/admin',async (req,res)=>{
    movies= await Movies.find({});
    res.render('./admin/index',{movies});
})

app.get('/admin/AddMovie',(req,res)=>{
    res.render('./admin/addmovie')
})
//end

//listening on port;
const port=process.env.PORT||3000;
app.listen(port,console.log('server listening 3000'));