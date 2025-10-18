const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON and URL-encoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Set EJS as the templating engine

app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store posts
let posts = [


    {
        id: uuidv4(),
        username: "john_doe",
        content: "Hello, this is my first post!",
    },
    {
        id: uuidv4(),
        username: "jane_smith",
        content: "Excited to join this platform!",
    },
    {
        id: uuidv4(),
        username: "alice_wonder",
        content: "Loving the community here.",
    },
    {
        id: uuidv4(),
        username: "bob_builder",
        content: "Just built my first app!",
    },
];





// Basic route to test server

app.get('/posts', (req, res) => {
  res.render("index.ejs", { posts: posts });
});
//create and new route
app.get('/posts/new', (req, res) => {
  res.render("new.ejs");
});
// Handle form submission to create a new post
app.post('/posts', (req, res) => {
     let { username, content } = (req.body);
     let id = uuidv4();
     posts.push({ id, username, content });
     // Redirect to the posts list after adding a new post
    res.redirect('/posts'); 
});
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post: post });
   
});

//update route
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);  
    post.content = newContent;
    console.log(post);

  console.log(id);
  res.redirect('/posts');
});
//edit route
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);  
    res.render("edit.ejs", { post: post });
});
//delete route
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect('/posts');
});
// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});