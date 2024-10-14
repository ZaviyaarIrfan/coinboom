import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-14">
            <div className="container mx-auto px-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Coin lists */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Coin lists
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Hot
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    New
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Most Traded
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* By EVM */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">By EVM</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Binance Coins
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Ethereum Coins
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Cronos Coins
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Polygon Coins
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Avax Coins
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Promote
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Submit Coin
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Email
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        2021-2024© Coinboom
                    </p>
                    <div className="flex space-x-4">
                        <p className="text-lg font-semibold mr-4">
                            Join the community
                        </p>
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <TwitterIcon />
                        </a>
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <TelegramIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
