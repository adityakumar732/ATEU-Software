const Aunthenticated = require("../Middlewares/AauthMiddleware");

const router = require("express").Router();

// Temporary product data
const products = [
    {
        id: "1",
        category: "Electronics",
        title: "Mobile",
        description: "A high-performance smartphone with modern features.",
        image: "https://via.placeholder.com/300x200?text=Mobile",
        price: 10000,
        rating: 4.5
    },
    {
        id: "2",
        category: "Electronics",
        title: "Smart TV",
        description: "A smart television with a high-quality display.",
        image: "https://via.placeholder.com/300x200?text=Smart+TV",
        price: 20000,
        rating: 4.7
    }
];

// GET all products
router.get("/", Aunthenticated, (req, res) => {
    res.status(200).json(products);
});

// DELETE product
router.delete("/:id", Aunthenticated, (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(
        (product) => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(productIndex, 1);

    return res.status(200).json({
        message: "Product deleted successfully",
        success: true
    });
});

module.exports = router;