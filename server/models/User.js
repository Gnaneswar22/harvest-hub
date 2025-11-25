const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        country: String,
        flat: String,
        area: String,
        state: String,
        pincode: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['producer', 'consumer'],
        default: 'consumer',
    },
    consumerType: {
        type: String,
        enum: ['customer', 'retailer'],
    },
},
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
