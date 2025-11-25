const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300, // The document will be automatically deleted after 5 minutes (300 seconds)
        },
    },
    {
        timestamps: true,
    }
);

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
