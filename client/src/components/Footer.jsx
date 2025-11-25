import React from 'react';
import { Apple, Store, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import HarvestHubLogo from '../assets/images/Harvest_Hub.png';

const Footer = () => {
    return (
        <footer className="bg-[#558B2F] text-white pt-12 pb-6 px-8 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Apps */}
                <div className="flex flex-col gap-6">
                    <img src={HarvestHubLogo} alt="Harvest Hub Logo" className="w-32 h-32 object-contain" />

                    <div className="flex flex-col gap-2">
                        <button className="bg-white text-black rounded px-4 py-2 flex items-center gap-2 w-40">
                            <Apple size={24} />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px]">Download on the</span>
                                <span className="font-bold text-sm">App Store</span>
                            </div>
                        </button>
                        <button className="bg-black text-white rounded px-4 py-2 flex items-center gap-2 w-40 border border-gray-600">
                            <Store size={24} />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px]">GET IT ON</span>
                                <span className="font-bold text-sm">Google Play</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Links Columns */}
                <div>
                    <h3 className="font-bold text-lg mb-4">About HH</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li><a href="#" className="hover:underline">Who we are</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">Work with us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Contact us</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li><a href="#" className="hover:underline">Help & Support</a></li>
                        <li><a href="#" className="hover:underline">Partner with us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Policies</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">Refund Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto mt-12 pt-8 border-t border-white/20 text-xs opacity-80">
                <p>© 2025 Harvest Hub. Discover a wide selection of farm-fresh fruits, vegetables, dairy, grains, and daily essentials — all delivered with care and sourced ethically. At Harvest Hub, we prioritize convenience, quality, and customer satisfaction.</p>
            </div>
        </footer>
    );
};

export default Footer;
