const { response } = require("express");
const ProductModel = require("../model/ProductModel");

//CRUD Operations
const searchProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};
//Get All Products Slug
const productsSlug = async (req, res) => {
  const products = await ProductModel.find({}).select({
    _id: 0,
    slug: 1,
    category: 1,
  });
  res.json(products);
};
//Get All Products in specific Category
const getCategoryProducts = async (req, res) => {
  const products = await ProductModel.find({
    category: req.params.name,
  }).select({
    _id: 0,
    images: 0,
  });
  res.json(products);
};
const getBasicProductsData = async (req, res) => {
  const products = await ProductModel.find({}).select({
    _id: 0,
    images: 0,
  });
  res.json(products);
};
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};

const getProductBySlug = (req, res) => {
  ProductModel.findOne({ slug: req.params.slug })
    .then((response) => {
      console.log("Get Request for product slug=" + req.params.slug);
      res.json(response);
    })
    .catch((err) => console.log(err));
};

const addProduct = (req, res) => {
  let product = new ProductModel(req.body);
  product
    .save()
    .then(() => res.send("Product Added"))
    .catch((err) => console.log("Error in add product controller" + err));
};
const updateProduct = (req, res) => {
  ProductModel.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
  })
    .then((response) => {
      console.log("updated");
      res.json(response);
    })
    .catch((err) => res.json(err));
};
const deleteProduct = (req, res) => {
  ProductModel.findOneAndDelete({ slug: req.params.slug })
    .then((response) => {
      console.log(response);
      res.json({ message: response });
    })
    .catch((err) => res.json({ message: err }));
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getBasicProductsData,
  getCategoryProducts,
  productsSlug,
};
