const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Buyer
const addOrderItems = async (req, res) => {
    const { product, quantity, totalPrice, negotiatedPrice } = req.body;

    if (!product) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            buyer: req.user._id,
            product,
            quantity,
            totalPrice,
            negotiatedPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'buyer',
        'name email'
    ).populate('product');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

module.exports = { addOrderItems, getOrderById };
