var express = require("express"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
app = express();

//to set-up/configure mongodb (thru mongoose)
mongoose.connect("mongodb://localhost:27017/resful_blog_app");
app.set("view engine", "ejs");
//to server custom stylesheet
app.use(express.static("public"));
app.use(methodOverride("_method"));
//to enable body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

//config Schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Blog = mongoose.model("Blog", blogSchema);

//data seeding
// Blog.create({
// 	title: "Labrador",
// 	image: "https://images.unsplash.com/photo-1524401033441-e87cab019093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body: "short-coated tan dog sitting on yellow petaled flower field"
// });

//RESTFUL ROUTES

//home route
app.get("/", function(req, res){
	res.redirect("/blogs");
});

//index	-  /blogs	- GET	- List all blogs - Blog.find()
app.get("/blogs", function(req, res){
	//list all blogs
	Blog.find({}, function(err, allBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: allBlogs})
		}
	})	
});

//new blog route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//create route: POST new blog
app.post("/blogs", function(req, res){
	//create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err);
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});	

//show blog ie., details of particular blog
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.render("/blogs")
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

//edit blog route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlogToEdit){
		if(err){
			res.render("/blogs");
		} else{
			res.render("edit", {blog: foundBlogToEdit});
		}
	})	
})

//update route
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.render("/blogs");
		} else{
			(res.redirect("/blogs/" + req.params.id));
		}
	});

});

//delete route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});


//port config
app.listen(3000, function(){
	console.log("RESTful Routing blog App Server started!")
});