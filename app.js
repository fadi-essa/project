const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Mydata.find()
    .then((result) => {
      res.render("home", { mytitle: "Home Page" ,arr : result });
    })
    .catch((err) => {
      console.log(err);
    });
  
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

app.post("/", (req, res) => {
  const newData = new Mydata(req.body);

  newData
    .save()
    .then(() => {
      res.redirect("index.html");
    })
    .catch((err) => {
      console.error("Failed to save data:", err);
    });
});
