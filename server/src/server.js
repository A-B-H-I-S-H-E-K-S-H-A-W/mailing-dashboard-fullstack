import { app } from "./app.js";
import { register } from "./controllers/auth.controller.js";
import { configDotenv } from "dotenv";
import { mongoDBConnection } from "./db/db.js";
configDotenv();

const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("Hello World");
});

mongoDBConnection()
  .then((data) => {
    console.log("MONGO DB CONNECTION ESTABLISHED ::::", data.connection.host);

    app.listen(PORT, () => {
      console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
    });
    register();
  })
  .catch((error) => {
    console.log("MongoDB connection failed ::::", error);
  });
