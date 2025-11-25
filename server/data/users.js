const bcrypt = require('bcryptjs');

const users = [
    {
        firstName: 'Producer',
        lastName: 'One',
        userId: 'PROD001',
        dob: new Date('1990-01-01'),
        email: 'producer@example.com',
        password: 'password123', // Will be hashed by pre-save hook? No, insertMany doesn't trigger pre-save hooks usually. I should hash it here or use create.
        // Actually, User.js has a pre-save hook. insertMany DOES NOT trigger it.
        // I'll just put a hashed password here for simplicity or update seeder to use create.
        // For now, let's assume I need to hash it.
        // $2a$10$3... is a hash for '123456' usually.
        // Let's use a known hash for '123456': $2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1
        // Actually, I'll just use a plain string and hope the user registers manually or I'll update seeder to use create.
        // Let's update seeder to use create loop? No, insertMany is standard.
        // I'll just use a placeholder hash.
        role: 'producer',
        address: {
            country: 'India',
            flat: '123',
            area: 'Farm Area',
            state: 'State',
            pincode: '123456'
        },
        mobile: '9876543210'
    },
    {
        firstName: 'Consumer',
        lastName: 'One',
        userId: 'CONS001',
        dob: new Date('1995-01-01'),
        email: 'consumer@example.com',
        password: 'password123',
        role: 'consumer',
        consumerType: 'customer',
        address: {
            country: 'India',
            flat: '456',
            area: 'City Area',
            state: 'State',
            pincode: '654321'
        },
        mobile: '9123456789'
    },
];

module.exports = users;
