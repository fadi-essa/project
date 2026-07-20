const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");
app.set("view engine", "ejs");
app.use(express.static(`public`));

//Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view", {});
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", {});
});



app.get("/index.html", (req, res) => {
  res.send("<h1>Data has been sent and saved successfully!</h1>");
});

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


mongoose
  .connect(
    "mongodb+srv://fadialessa0_db_user:taulEgUCLI7Y4Twn@cluster0.gohoseq.mongodb.net/all-data?appName=Cluster0",
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


