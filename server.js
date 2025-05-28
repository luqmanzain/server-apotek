const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const produkRoutes = require("./routes/produk");
app.use("/api/produk", produkRoutes);

const transaksiRoutes = require("./routes/transaksi");
app.use("/api/transaksi", transaksiRoutes);


module.exports = app;

// app.listen(3001, () => {
//   console.log("Server running on http://localhost:3001");
// });