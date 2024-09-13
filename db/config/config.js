const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sherllyzhao:sherllyzhao@sherllyzhao.6litq.mongodb.net/?retryWrites=true&w=majority&appName=sherllyzhao";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client