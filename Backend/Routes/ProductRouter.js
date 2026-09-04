const Aunthenticated = require("../Middlewares/AauthMiddleware");
const Product = require("../Models/ProductModel");


const router = require("express").Router();

// GET all products
router.get("/", Aunthenticated, async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});

// ADD product
router.post("/", Aunthenticated, async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            image,
            price,
            rating
        } = req.body;

        const newProduct = new Product({
            category,
            title,
            description,
            image,
            price,
            rating
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to add product"
        });
    }
});
// UPDATE product
router.put("/:id", Aunthenticated, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
});
// DELETE product
router.delete("/:id", Aunthenticated, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});

module.exports = router;