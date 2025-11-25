const axios = require('axios');

// Helper to generate random price
const getRandomPrice = () => Math.floor(Math.random() * (200 - 20) + 20);
const getRandomQuantity = () => Math.floor(Math.random() * 50) + 10;

// Fallback data to ensure instant loading if APIs are slow
const fallbackData = {
    fruits: [
        { name: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300' },
        { name: 'Banana', image: 'https://images.unsplash.com/photo-1571771896612-e63411190f75?w=300' },
        { name: 'Orange', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee8b?w=300' },
        { name: 'Strawberry', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4b0a6?w=300' },
        { name: 'Mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300' },
        { name: 'Pineapple', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300' }
    ],
    vegetables: [
        { name: 'Carrot', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300' },
        { name: 'Broccoli', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300' },
        { name: 'Tomato', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300' },
        { name: 'Spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300' },
        { name: 'Potato', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300' }
    ],
    meat: [
        { name: 'Chicken Breast', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300' },
        { name: 'Mutton', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300' },
        { name: 'Pork', image: 'https://images.unsplash.com/photo-1602498456745-e9503b30470b?w=300' }
    ],
    dairy: [
        { name: 'Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300' },
        { name: 'Cheese', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300' },
        { name: 'Butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300' },
        { name: 'Yogurt', image: 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=300' }
    ]
};

// @desc    Fetch external products based on category
// @route   GET /api/external/products/:category
// @access  Public
const getExternalProducts = async (req, res) => {
    const category = req.params.category.toLowerCase();
    let products = [];

    try {
        // Set a short timeout (2s) to ensure speed. If API is slow, use fallback.
        const axiosConfig = { timeout: 2000 };

        if (category === 'fruits') {
            const response = await axios.get('https://www.fruityvice.com/api/fruit/all', axiosConfig);
            products = response.data.map((item) => ({
                _id: `ext-fruit-${item.id}`,
                name: item.name,
                category: 'Fruits',
                price: getRandomPrice(),
                quantity: getRandomQuantity(),
                image: fallbackData.fruits[Math.floor(Math.random() * fallbackData.fruits.length)].image,
                description: `Fresh ${item.name} with ${item.nutritions.calories} calories per 100g.`,
                isExternal: true
            }));
        } else if (['vegetables', 'meat', 'dairy'].includes(category)) {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list', axiosConfig);
            const allIngredients = response.data.meals;

            let keywords = [];
            if (category === 'vegetables') keywords = ['carrot', 'broccoli', 'onion', 'potato', 'tomato', 'spinach', 'corn', 'pepper', 'cabbage', 'lettuce', 'garlic', 'ginger'];
            if (category === 'meat') keywords = ['chicken', 'beef', 'pork', 'lamb', 'mutton', 'sausage', 'bacon', 'ham'];
            if (category === 'dairy') keywords = ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'egg'];

            const filtered = allIngredients.filter(item => {
                const name = item.strIngredient.toLowerCase();
                return keywords.some(k => name.includes(k));
            });

            products = filtered.map((item, index) => ({
                _id: `ext-${category}-${index}`,
                name: item.strIngredient,
                category: category.charAt(0).toUpperCase() + category.slice(1),
                price: getRandomPrice(),
                quantity: getRandomQuantity(),
                image: `https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`,
                description: `Fresh ${item.strIngredient} sourced directly from partners.`,
                isExternal: true
            }));
        }

        // If API returned empty or failed logic, throw to catch block to use fallback
        if (products.length === 0) throw new Error("No products found from API");

        res.json(products);

    } catch (error) {
        console.log(`Using fallback data for ${category} due to: ${error.message}`);

        // Return high-quality fallback data immediately
        const fallbackList = fallbackData[category] || [];
        const mappedFallback = fallbackList.map((item, index) => ({
            _id: `fallback-${category}-${index}`,
            name: item.name,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            price: getRandomPrice(),
            quantity: getRandomQuantity(),
            image: item.image,
            description: `Fresh ${item.name} sourced locally.`,
            isExternal: true
        }));

        res.json(mappedFallback);
    }
};

module.exports = { getExternalProducts };
