const mongoose = require('mongoose')

exports.mongoConnect = async () => {
  const MongoUrl =
    "mongodb+srv://test:test@cluster0.mnh64.mongodb.net/shop?retryWrites=true&w=majority";
  try {
    await mongoose.connect(MongoUrl, {
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
};
