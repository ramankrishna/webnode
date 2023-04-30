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



 // Read the stock array from db.json   
const stocks = fs.readFileSync(path.join(__dirname,'public' ,'db.json'),'utf-8', (err, data) => {
    if (err) throw err;
    return JSON.stringify(data);
});

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
                console.log(stocks);
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
