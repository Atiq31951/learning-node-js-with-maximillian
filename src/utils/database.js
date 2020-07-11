const MongoDb = require("mongodb");
const MongoDBClient = MongoDb.MongoClient;

let _db;

exports.mongoConnect = async () => {
  const MongoUrl =
    "mongodb+srv://test:test@cluster0.mnh64.mongodb.net/products?retryWrites=true&w=majority";
  try {
    MongoClient = await MongoDBClient.connect(MongoUrl, {
      useUnifiedTopology: true,
    });
    _db = MongoClient.db();
  } catch (error) {
    return error;
  }
};

exports.getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw "Error occured";
  }
};
