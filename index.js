const PORT = 8080;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const baseUrl = "https://www.theguardian.com/international";

app.get("/", function (req, res) {
  res.json("This is my web-scraper");
});

app.get("/results", (req, res) => {
  axios(baseUrl)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".dcr-nurayl", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url: `${baseUrl.replace("/international", "")}${url}`,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
