const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req,res) => {
    res.send("Server Initial Page");
})

app.get("/data", (req,res) => {
    res.json({
        products: ["product1","product2","product 3","product c4"]});
})

const port = 3000;
app.listen(port, ()=> console.log("Server is running at port 3000"));

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;

// // Load environment variables
// const OPENCART_API = process.env.OPENCART_API;
// const OPENCART_KEY = process.env.OPENCART_KEY;
// const ONDC_BASE_URL = process.env.ONDC_BASE_URL;

// console.log("one", OPENCART_API);
// console.log("two", OPENCART_KEY);
// console.log("three", ONDC_BASE_URL);