import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
