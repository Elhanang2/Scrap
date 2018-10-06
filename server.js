var express = require("express");

var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio= require("cheerio");


var db= require("./models");
var PORT= process.env.PORT || 5000;
var app= express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));


// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res){
    axios.get("https://www.nbcnews.com/").then(function(response){
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){
            var result= {};
            
            // console.log("result"+title);
            console.log("hiiii");
                       
              var  title = $(this).find("h2").find("a").text();
            
              var  imagelink = $(this).find("a").find("picture").find("img").attr("src");
           
             var   titlelink= $(this).find("h2").find("a").attr("href");
            
            
                
            if(title && imagelink && titlelink){
                db.Topstories.create({
                    title: title,
                    imagelink:imagelink,
                    titlelink: titlelink 
                },function(err,dbtopstories){
                    if(err){
                    console.log(err);
                    }else{
                    console.log(dbtopstories);
                }
                
                });
            };
        });// res.send("scrap complete");
        return result;
    });
});

app.get("/topstory", function(req, res){
    db.Topstories.find({})
    .then(function(dbtopstories){
        res.json(dbtopstories)
        //  res.render("index",{article:dbtopstories});
    }).catch(function(err){
        res.json(err);
    });
});
    app.get("/topstory/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Topstories.findOne({ _id: req.params.id })
          // ..and populate all of the notes associated with it
          .populate("comment")
          .then(function(dbtopstories) {
            // If we were able to successfully find an Article with the given id, send it back to the client
             res.json(dbtopstories);
            
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });
   




app.post("/topstory/:id", function(req, res){
    db.Comment.create(req.body)
        
    .then(function(dbcomment){
        // res.json(dbArticle);
        return db.Topstories.findOneAndUpdate({ _id: req.params.id }, { comment: dbcomment._id }, { new: true });

    }).then(function(dbtopstories) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbtopstories);
      }).catch(function(err){
        res.json(err); 
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });
  