const express = require("express");
const app = express();
const port = 5000;
const {sequelize} = require("./models/index");
const testRoutes = require("./routes/testRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.use("/login", loginRoutes);
app.use("/test", testRoutes);

app.listen(port, () => {
    console.log(`Application is on process: http://localhost:${port}`);
})