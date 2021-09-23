const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(__dirname + "/assets"));

app.use(
  session({
    secret: "this is session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`listening to localhost:${PORT}`);
});
