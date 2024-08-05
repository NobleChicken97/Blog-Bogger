import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let blogs = [];


//home page
app.get("/",(req,res)=>{
 const msgedit = req.query.msgedit;
    res.render("index.ejs", {
        blogs: blogs,
        msgedit: msgedit
    });
})

// to create a blog
app.post("/create",(req,res)=>{
    res.render("create.ejs");
})

// to search a blog to edit
app.post("/edit",(req,res)=>{
    res.render("Edit.ejs");  
})

// to actually create a blog
app.post("/submit",(req,res)=>{
    const newBlog = {
     tit : req.body.Title,
     cont : req.body.Content,
    }
 
    blogs.push(newBlog);
     console.log(`Title: ${req.body.Title} Content: ${req.body.Content}`)
     res.redirect("/");
 })
 



// to actually edit the blog
app.post("/Edit-Blog", (req, res) => {
    let titleToFind = req.body.Title2;
    let foundBlog = blogs.find(blog => blog.tit === titleToFind);

    if (foundBlog) {
        res.render("Edit-Blog.ejs", {
            msg: null,
            blog: foundBlog
        });
    } else {
        res.render("Edit-Blog.ejs", {
            msg: `Sorry, no blog found with title "${titleToFind}".`,
            blog: null
        });
    }
});

//to edit the content of the blog
app.post("/update-blog", (req, res) => {
    const { oldTitle, newTitle, newContent } = req.body;
    const blog = blogs.find(blog => blog.tit === oldTitle);

    if (blog) {
        blog.tit = newTitle; // Update title
        blog.cont = newContent; // Update content
        res.redirect("/?msgedit=Your blog has been updated successfully!");
    } else {
        res.redirect("/?msgedit=Blog not found.");
    }
});









// to delete a blog
app.post("/delete", (req, res) => {
    const titleToDelete = req.body.Title;
    blogs = blogs.filter(blog => blog.tit !== titleToDelete); 
    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
