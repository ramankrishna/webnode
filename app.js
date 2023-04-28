const http = require('http'); 
const path = require('path');
const fs = require('fs');
const stocks = [
    { name: 'AAPL', price: 200, change: 10, percentChange: 5, volume: 1000 },
    { name: 'GOOG', price: 300, change: 20, percentChange: 10, volume: 2000 },
    { name: 'MSFT', price: 400, change: 30, percentChange: 15, volume: 3000 },
    { name: 'AMZN', price: 500, change: 40, percentChange: 20, volume: 4000 },
    { name: 'FB', price: 600, change: 50, percentChange: 25, volume: 5000 }
];

const server = http.createServer((req, res) => {

        const content = fs.readFileSync(

            path.join(__dirname, 'public', 'index.html'),
            'utf8'
        );
        const css = fs.readFileSync(

            path.join(__dirname, 'public', 'style.css'),
            'utf8'
        );

        switch (req.url) {
            case "/style.css" :
                res.writeHead(200, {"Content-Type": "text/css"});
                res.write(css);
                break;
            case "/api" :
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(stocks));
                break;
            default :    
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(content);
        };
        res.end();



        // write the html and css files to the response

        


    /* Title of the Project: - Stock Trading Application

Attributes that are fetched from API for each Stock:

Stock Name
Price
Change
Percent Change
Volume

*/



        // fetch the stocks from the mongoDB by creating the connection to the database

       /* const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("stocks").find({}).toArray(function(err, result) {
                if (err) throw err;
                //convert the result to JSON array and write it to api endpoint
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
                db.close();
            });


        

*/


        // allow the cors origin
       

});

const PORT = process.env.PORT || 5552;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
