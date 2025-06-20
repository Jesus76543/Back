import express from "express";
import { getModels } from "../models/connections.js";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { name, status } = req.query;
  const { Producto } = getModels();

  try {
    // Construir filtros
    const filters: any = {};

    if (name) {
      filters.name = { $regex: name, $options: "i" }; // Búsqueda case-insensitive
    }

    if (status !== undefined) {
      filters.status = status === "true";
    } else {
      filters.status = true; // Por defecto, solo productos activos
    }

    const products = await Producto.find(filters);
    res.json({ products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProductById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { productId } = req.params;
  const { Producto } = getModels();

  try {
    const product = await Producto.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    if (!product.status) {
      res.status(404).json({ message: "Producto no disponible" });
      return;
    }

    res.json({ product });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const saveProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { name, description, Quantity, price } = req.body;
  const { Producto } = getModels();

  try {
    // Validar campos requeridos
    if (
      !name ||
      !description ||
      price === undefined ||
      Quantity === undefined
    ) {
      res.status(400).json({
        message: "Nombre, descripción, cantidad y precio son requeridos",
      });
      return;
    }

    const newProduct = new Producto({
      name,
      description,
      Quantity,
      price,
      status: true,
      createdAt: new Date(),
    });

    const product = await newProduct.save();
    res.status(201).json({ message: "Producto creado exitosamente", product });
  } catch (error) {
    console.error("Error al guardar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { productId } = req.params;
  const { name, description, Quantity, price } = req.body;
  const { Producto } = getModels();

  try {
    // Verificar si el producto existe
    const existingProduct = await Producto.findById(productId);
    if (!existingProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    // Preparar datos de actualización
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (Quantity !== undefined) updateData.Quantity = Quantity;
    if (price !== undefined) updateData.price = price;

    // Actualizar producto
    const updatedProduct = await Producto.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Error al actualizar producto" });
      return;
    }

    res.json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { productId } = req.params;
  const { Producto } = getModels();

  try {
    // Verificar si el producto existe
    const existingProduct = await Producto.findById(productId);
    if (!existingProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    // Verificar si el producto ya está eliminado
    if (!existingProduct.status) {
      res.status(400).json({ message: "El producto ya está eliminado" });
      return;
    }

    // Realizar soft delete
    const deletedProduct = await Producto.findByIdAndUpdate(
      productId,
      {
        status: false,
        deleteAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!deletedProduct) {
      res.status(404).json({ message: "Error al eliminar producto" });
      return;
    }

    res.json({
      message: "Producto eliminado exitosamente",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProductStock = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { productId } = req.params;
  const { quantity, operation } = req.body; // operation: 'add' or 'subtract'
  const { Producto } = getModels();

  try {
    const product = await Producto.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    if (!product.status) {
      res.status(400).json({ message: "Producto no disponible" });
      return;
    }

    let newQuantity = product.Quantity;

    if (operation === "add") {
      newQuantity += quantity;
    } else if (operation === "subtract") {
      newQuantity -= quantity;
      if (newQuantity < 0) {
        res.status(400).json({ message: "Stock insuficiente" });
        return;
      }
    } else {
      res
        .status(400)
        .json({ message: "Operación no válida. Use 'add' o 'subtract'" });
      return;
    }
    const updatedProduct = await Producto.findByIdAndUpdate(
      productId,
      { Quantity: newQuantity },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Stock actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
