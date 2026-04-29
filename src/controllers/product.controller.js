const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Elemento creado correctamente",
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear elemento", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");

    res.json({
      message: "Elementos consultados correctamente",
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: "Error al consultar elementos", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Elemento no encontrado" });
    }

    res.json({
      message: "Elemento consultado correctamente",
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: "Error al consultar elemento", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: "Elemento no encontrado" });
    }

    res.json({
      message: "Elemento actualizado correctamente",
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar elemento", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Elemento no encontrado" });
    }

    res.json({
      message: "Elemento eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar elemento", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
