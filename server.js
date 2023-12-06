const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the server!</h1>");
});

app.use("/", userRoutes);
app.use("/", taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});