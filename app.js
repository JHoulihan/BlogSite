const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
var _ = require("lodash"); 

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const homeStartingContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sapiente officiis error ex! Odit esse natus nam! Ipsa incidunt enim impedit iure aspernatur velit numquam porro minima saepe. Mollitia, molestias.";
const aboutContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sapiente officiis error ex! Odit esse natus nam! Ipsa incidunt enim impedit iure aspernatur velit numquam porro minima saepe. Mollitia, molestias.";
const contactContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sapiente officiis error ex! Odit esse natus nam! Ipsa incidunt enim impedit iure aspernatur velit numquam porro minima saepe. Mollitia, molestias.";

const postSchema = {
    title : String,
    entry: String    
};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    
        Post.find({}, (err, posts) => {
            res.render("home", {
                startingContent: homeStartingContent,
                 posts: posts
                });
            });
    });

app.get("/about", (req, res) => {
    var about = "About";

    res.render("about", {about: about, aboutContent: aboutContent});
});

app.get("/contact", (req, res) => {
    var contact = "Contact Us";

    res.render("contact", {contact: contact, contactContent: contactContent});
});

app.get("/compose", (req, res) => {
    var compose = "Start writing";
    res.render("compose", {compose: compose});

    
});

app.post("/compose", (req, res)=> {

    const post = new Post ({
            title: req.body.title,
            entry: req.body.entry
    });


    post.save( (err)=>{
        if(!err){
            res.redirect("/");
        }
    });
});





app.get('/posts/:postId', function (req, res) {
    
    const requestedPostId = req.params.postId;

    Post.findOne({_id:requestedPostId}, (err, post)=>{
        
        if(!err) {
                   res.render("post", {titleContent: post.title, postContent: post.entry})
            }

            });
});

app.listen("3000", ()=>console.log("Server running on port 3000"));
 
    
    
    
    
     

