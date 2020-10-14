const mongoose = require("mongoose");
const config = require("config-tiny");

module.exports = async function (app) {
  const URI = config.get("mongodb_url");

  mongoose.Promise = global.Promise;
  try {
    const { connection } = await mongoose.connect(URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    if (config.get("env") == "dev") {
      console.log(
        `connected to "${connection.name}" database at ${connection.host}:${connection.port}`
      );
    }
    return connection;
  } catch (error) {
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running."
    );
    console.log(error);
    process.exit(1);
  }
};
