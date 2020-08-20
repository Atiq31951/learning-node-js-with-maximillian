const mongoose = require("mongoose");

exports.mongoConnect = async () => {
  const MongoUrlProd =
    "mongodb+srv://test:test@cluster0.mnh64.mongodb.net/shop?retryWrites=true&w=majority";
  const MongoUrlDev = "mongodb://localhost:27017/shop";
  try {
    await mongoose.connect(MongoUrlDev, {
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
};
