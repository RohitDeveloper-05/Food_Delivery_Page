require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const configureDB = () => {
  mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("Error connecting to db", err);
    });
};

configureDB();

const categorySchema = new mongoose.Schema({ name: String });
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
