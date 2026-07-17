import mongoose from "mongoose";

const uri =
  "mongodb+srv://kalpeshpatil65555_db_user:XipOy7raKsWkS3PN@cluster0.byk6ahg.mongodb.net/SmartCNG?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err);
    process.exit(1);
  });