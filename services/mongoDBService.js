// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://tstanescu:Super112@cluster0.hz6np.mongodb.net/?retryWrites=true&w=majority";

// export const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// dbClient.connect(err => {
//   const collection = dbClient.db("test").collection("devices");
// console.log('hello')
//   collection();


  
//   // perform actions on the collection object
//   dbClient.close();
// });


// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "<COLLECTION_NAME>",
//     "database": "<DATABASE_NAME>",
//     "dataSource": "Cluster0",
//     "projection": {
//         "_id": 1
//     }
// });



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tstanescu:<password>@cluster0.wsu3h.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


var axios = require('axios');
var data = JSON.stringify({
    "collection": "favorites",
    "database": "savedQueries",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-fxutb/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'T7yaRuvD9ZLGeACbWeK0FpEVXL6Y7G6iLjb7C2qH2lHitn1j88nIRmOlN4IFfguy',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

    export default axios