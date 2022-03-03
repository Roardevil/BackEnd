const { json } = require('body-parser');
let express = require('express');
let url = require("url");
var cors = require('cors')

const port = process.env.PORT || 3000
//The express module is a function. When it is executed it returns an app object
let app = express();

app.use(express.static("public"));


app.use(cors())

//Set up the application to handle GET requests sent to the user path


app.use(function (request, response, next) { // middleware
    console.log("In comes a request to: " + request.url);
    //     console.log("Request IP: " + req.url);
    // console.log("Request date: " + new Date());

    next();
    // response.end("Hello, world!");
});


// load Express.js

// parse the request parameters
app.use(express.json())
// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect("mongodb+srv://Deep:deep@cluster0.u72p7.mongodb.net/"
    , (err, client) => {
        db = client.db('webstore')
    })
// get the collection name
app.param('collectionName'
    , (req, res, next, collectionName) => {
        req.collection = db.collection(collectionName)
        // console.log('collection name:', req.collection)
        return next()
    });
var path = require("path");
var fs = require("fs");

app.use("/image",function (req, res, next) {
    // Uses path.join to find the path where the file should be
    var filePath = path.join(__dirname,
        "images"
        , req.url);
    // Built-in fs.stat gets info about a file
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }
        if (fileInfo.isFile()) res.sendFile(filePath);
        else next();
    });
});

app.use("/image", function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you didn’t find a static file.");
});
// app.use(function (req, res) {
//     // Sets the status code to 404
//     res.status(404);
//     // Sends the error "File not found!”
//     res.send("File not found!");
// });


// var publicPath = path.resolve(__dirname,
//     "/images");
// console.log(publicPath);
// Sends static files from the publicPath directory

// app.use("/images", express.static(publicPath));


// dispaly a message for root path to show that API is working

// retrieve all the objects from an collection
app.get('/collection/:collectionName'
    , (req, res) => {
        console.log("yoyoy")
        req.collection.find({}).toArray((e, results) => {
            if (e) return next(e)
            res.send(results)
        })
    })

app.get('/collection/:collectionName/:searchTerm'
    , (req, res) => {
        console.log(req.params.searchTerm)
        var regex = new RegExp(req.params.searchTerm, "i");
        console.log(regex)
        req.collection.find({ subject: regex}||{location:regex}).toArray((e, results) => {
            if (e) return next(e)
            res.send(results)
            console.log(results)
        })
    })

app.post('/collection/:collectionName'
    , (req, res, next) => {
        console.log(req);
        req.collection.insert(req.body, (e, results) => {
            if (e) return next(e)
            res.send(200)
        })
    });
const ObjectID = require('mongodb').ObjectID;

app.put('/collection/:collectionName/:id', (req, res, next) => {
    console.log(req.params.id);
    req.collection.update(
        { _id: new ObjectID(req.params.id) },
        { $set: req.body },
        { safe: true, multi: false },
        (e, result) => {
            if (e) return next(e)
            res.send((result.matchedCount === 1) ? { msg: 'success' } : { msg: 'error' })
        })
});
app.use('/'
    , function (req, res) {
        res.send('Select a collection, e.g., /collection/messages')
    });

//Start the app listening on port 8080
app.listen(port);

async function handleProductGet(request, response) {

}
