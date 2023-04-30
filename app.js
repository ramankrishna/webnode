const http = require('http'); 
const path = require('path');
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ramankrishna10:Krrishna123@cluster0.qpnuaxe.mongodb.net/test?authSource=admin&replicaSet=atlas-p4if4c-shard-0&readPreference=primary&ssl=true";
stocksFromDB = [];


 const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

stocksFromDBPromise = client.db("stocks").collection("stockrecords").find().toArray(function(err, result) {
    if (err) throw err;
    return result;
    });

    stocksFromDBPromise.then((result) => {
        stocksFromDB = result;
    }).
    then(() => {
        console.log(stocksFromDB);
    })
    .catch((err) => {
        console.log(err);
    });




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
                    client.db("stocks").collection("stockrecords").find().toArray(function(err, result) {
                    if (err) throw err;
                    return result;
                    }).then((result) => {
                        stocksFromDB = result;
                    }).
                    then(() => {
                        console.log(stocksFromDB);
                    })
                    .catch((err) => {
                        stocksFromDB = stocks;
                    });
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.write(JSON.stringify(stocksFromDB));
                break;
            default :    
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(content);
        };
        res.end();
});

const PORT = process.env.PORT || 5552;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
