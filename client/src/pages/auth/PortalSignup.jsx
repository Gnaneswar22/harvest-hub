import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

import { useAuth } from '../../context/AuthContext';

const PortalSignup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userId: '',
        dob: '',
        email: '',
        password: '',
        consumerType: 'customer', // Default
        address: {
            country: '',
            flat: '',
            area: '',
            state: '',
            pincode: '',
        },
        mobile: '',
        otp: '',
        role: 'consumer', // Default, will be asked later or inferred
    });

    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['country', 'flat', 'area', 'state', 'pincode'].includes(name)) {
            setFormData({ ...formData, address: { ...formData.address, [name]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const nextStep = async () => {
        // Basic validation for Step 1
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.userId || !formData.dob) {
                alert("Please fill in all required fields.");
                return;
            }
        }

        // Step 3: Send OTP
        if (step === 3) {
            if (!formData.mobile) {
                alert("Please enter a mobile number.");
                return;
            }
            try {
                await api.post('/api/auth/send-otp', { mobile: formData.mobile });
                // If success, proceed
            } catch (error) {
                console.error(error);
                alert('Error sending OTP: ' + (error.response?.data?.message || error.message));
                return; // Don't advance
            }
        }

        // Step 4: Verify OTP
        if (step === 4) {
            if (!isOtpVerified) {
                alert("Please verify OTP first.");
                return;
            }
        }

        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleVerifyOtp = async () => {
        try {
            await api.post('/api/auth/verify-otp', { mobile: formData.mobile, otp: formData.otp });
            setIsOtpVerified(true);
            alert("OTP Verified!");
        } catch (error) {
            console.error(error);
            alert('Invalid OTP');
            setIsOtpVerified(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await api.post('/api/auth/send-otp', { mobile: formData.mobile });
            alert("OTP Resent!");
        } catch (error) {
            console.error(error);
            alert('Error resending OTP');
        }
    };

    const handleRoleSelect = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
        handleSubmit(selectedRole);
    };

    const handleSubmit = async (roleOverride) => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.userId || !formData.dob) {
            alert("Please fill in all required fields in Step 1.");
            setStep(1);
            return;
        }

        try {
            // Final registration logic
            // For now, we assume OTP is verified
            const { otp, ...dataToSend } = formData;

            // Use the override if provided (for immediate submission)
            if (roleOverride) {
                dataToSend.role = roleOverride;
            }

            // Let's add a step 5 for Role Selection if we are at step 4 (OTP)
            if (step === 4) {
                // This block is actually unreachable now because nextStep handles the transition to 5
                setStep(5);
                return;
            }

            // If step 5, submit
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await api.post('/api/auth/register', dataToSend, config);

            register(data);

            if (data.role === 'producer') {
                navigate('/producer/dashboard');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error(error);
            alert('Error registering: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen bg-[#558B2F] flex flex-col font-sans">
            {/* Header */}
            <div className="w-full p-6 flex justify-between items-center">
                <div className="text-white text-3xl font-bold flex items-center">
                    <span className="text-5xl">H</span><span className="text-sm mt-4">ARVEST</span>
                    <span className="text-5xl ml-1">H</span><span className="text-sm mt-4">UB</span>
                </div>
                <button type="button" className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
                    Log In
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-[#E0E0E0] p-10 rounded-lg shadow-2xl w-full max-w-md">

                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="text-blue-600 text-xl font-semibold mb-2">Let's get started.</h2>
                            <h1 className="text-3xl font-serif text-gray-800 mb-8">Please enter your details</h1>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">User ID</label>
                                    <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Date of Birth</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Customer Type</label>
                                    <select name="consumerType" value={formData.consumerType} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                        <option value="customer">Customer</option>
                                        <option value="retailer">Retailer</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button type="button" onClick={nextStep} className="text-blue-600 font-semibold hover:underline flex items-center">
                                    Continue <span className="ml-1">&gt;</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h1 className="text-2xl font-serif text-gray-800 mb-8 text-center">Please enter your valid address to get delivered.</h1>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Country/Region</label>
                                    <input type="text" name="country" value={formData.address.country} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Flat, House no., Building, Company, Apartment</label>
                                    <input type="text" name="flat" value={formData.address.flat} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Area, Street, Sector, Village</label>
                                    <input type="text" name="area" value={formData.address.area} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">State</label>
                                        <input type="text" name="state" value={formData.address.state} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Pincode</label>
                                        <input type="text" name="pincode" value={formData.address.pincode} onChange={handleChange} className="w-full p-2 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} className="text-gray-600 font-semibold hover:underline flex items-center">
                                    <span className="mr-1">&lt;</span> Back
                                </button>
                                <button type="button" onClick={nextStep} className="text-blue-600 font-semibold hover:underline flex items-center">
                                    Continue <span className="ml-1">&gt;</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in text-center">
                            <h2 className="text-blue-600 text-xl font-semibold mb-2">Great!</h2>
                            <h1 className="text-2xl font-serif text-gray-800 mb-8">Please enter your mobile number to proceed to HarvestHub.</h1>

                            <p className="text-xs text-gray-500 mb-6 text-left">
                                By providing your phone number, you agree to receive text messages from HarvestHub.
                                <br />Standard message and data rates may apply.
                            </p>

                            <div className="flex items-center mb-6">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm font-semibold text-gray-700">I agree to the above terms and conditions.</span>
                            </div>

                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className="w-full p-3 border-none rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8] text-center text-blue-600 font-bold"
                            />

                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} className="text-gray-600 font-semibold hover:underline flex items-center">
                                    <span className="mr-1">&lt;</span> Back
                                </button>
                                <button type="button" onClick={nextStep} className="text-blue-600 font-semibold hover:underline flex items-center">
                                    Continue <span className="ml-1">&gt;</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-fade-in text-center">
                            <h2 className="text-blue-600 text-xl font-semibold mb-2">Good!</h2>
                            <h1 className="text-xl font-serif text-gray-800 mb-4">We've sent a text message to <br /> {formData.mobile || '+91 XXXXXX9494'} with a verification code.</h1>

                            <p className="text-xs text-gray-500 mb-8">Standard message and data rates may apply</p>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter OTP"
                                    className="flex-grow p-3 border-none rounded-l shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-[#F0F0E8]"
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    className={`px-6 py-3 rounded-r font-semibold transition ${isOtpVerified ? 'bg-green-600 text-white' : 'bg-[#558B2F] text-white hover:bg-green-800'}`}
                                >
                                    {isOtpVerified ? 'Verified' : 'Verify'}
                                </button>
                            </div>

                            <p className="text-xs text-green-700 mb-8 flex items-center justify-center">
                                <span className="mr-1">⏱</span> This code will expire in 5 min.
                            </p>

                            <p className="text-xs text-gray-600">
                                Didn't receive text? <button type="button" onClick={handleResendOtp} className="underline text-green-700">Resend.</button>
                            </p>

                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} className="text-gray-600 font-semibold hover:underline flex items-center">
                                    <span className="mr-1">&lt;</span> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`font-semibold hover:underline flex items-center ${isOtpVerified ? 'text-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
                                    disabled={!isOtpVerified}
                                >
                                    Continue <span className="ml-1">&gt;</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="animate-fade-in text-center">
                            <h1 className="text-2xl font-serif text-gray-800 mb-8">Are you a Producer or a Consumer?</h1>

                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect('producer')}
                                    className={`w-full p-4 rounded shadow-md font-bold text-lg transition ${formData.role === 'producer' ? 'bg-[#558B2F] text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    Producer (Farmer)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect('consumer')}
                                    className={`w-full p-4 rounded shadow-md font-bold text-lg transition ${formData.role === 'consumer' ? 'bg-[#558B2F] text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    Consumer (Buyer)
                                </button>
                            </div>
                            <div className="mt-8 flex justify-start">
                                <button type="button" onClick={prevStep} className="text-gray-600 font-semibold hover:underline flex items-center">
                                    <span className="mr-1">&lt;</span> Back
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Footer Links */}
            <div className="w-full p-6 flex justify-between text-white text-sm">
                <div className="flex gap-8">
                    <a href="#" className="hover:underline">About HH</a>
                    <a href="#" className="hover:underline">Contact us</a>
                    <a href="#" className="hover:underline">Help & Faq</a>
                    <a href="#" className="hover:underline">Policies</a>
                </div>
                <div className="text-white font-bold text-2xl">H<span className="text-xs">ARVEST</span> H<span className="text-xs">UB</span></div>
            </div>
        </div>
    );
};

export default PortalSignup;
