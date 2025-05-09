const { default: mongoose } = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sayhan:E3tANMnETteU6MKy@sayhan.fatp7.mongodb.net/religion?retryWrites=true&w=majority&appName=Sayhan",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
