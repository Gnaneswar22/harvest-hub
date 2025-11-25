const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { firstName, lastName, userId, dob, email, password, address, mobile, role, consumerType } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    try {
        const user = await User.create({
            firstName,
            lastName,
            userId,
            dob,
            email,
            password,
            address,
            mobile,
            role,
            consumerType
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const Otp = require('../models/Otp');

// @desc    Send OTP
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        res.status(400).json({ message: 'Mobile number is required' });
        return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete existing OTP for this mobile
    await Otp.deleteMany({ mobile });

    await Otp.create({
        mobile,
        otp,
    });

    console.log(`OTP for ${mobile}: ${otp}`); // Log to console for dev

    res.status(200).json({ message: 'OTP sent successfully' });
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        res.status(400).json({ message: 'Mobile and OTP are required' });
        return;
    }

    const otpRecord = await Otp.findOne({ mobile, otp });

    if (otpRecord) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

module.exports = { authUser, registerUser, sendOtp, verifyOtp };
