import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import Link from "next/link";

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
                                <Link href="/trending" className="hover:text-blue-500">
                                    Hot
                                </Link>
                            </li>
                            <li>
                                <Link href="/new" className="hover:text-blue-500">
                                    New
                                </Link>
                            </li>
                            <li>
                                <Link href="/trade" className="hover:text-blue-500">
                                    Most Traded
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* By EVM */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">By EVM</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/new/binance" className="hover:text-blue-500">
                                    Binance Coins
                                </Link>
                            </li>
                            <li>
                                <Link href="/new/ethereum" className="hover:text-blue-500">
                                    Ethereum Coins
                                </Link>
                            </li>
                            <li>
                                <Link href="/new/arbitrum" className="hover:text-blue-500">
                                    Arbitrum Coins
                                </Link>
                            </li>
                            <li>
                                <Link href="/new/solana" className="hover:text-blue-500">
                                    Solana Coins
                                </Link>
                            </li>
                            <li>
                                <Link href="/new/polygon" className="hover:text-blue-500">
                                    Polygon Coins
                                </Link>
                            </li>
                            <li>
                                <Link href="/new/tron" className="hover:text-blue-500">
                                    Tron Coins
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/promote" className="hover:text-blue-500">
                                    Promote
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit" className="hover:text-blue-500">
                                    Submit Coin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="mailto:admin@bobantoken.com" className="hover:text-blue-500">
                                    Email
                                </Link>
                            </li>
                            <li>
                                <Link href="https://t.me/BobanBBToken" className="hover:text-blue-500">
                                    Telegram
                                </Link>
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
                        <Link
                            href="https://x.com/Boban_token"
                            target="_blank"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <TwitterIcon />
                        </Link>
                        <Link
                            href="https://t.me/BobanBBToken"
                            target="_blank"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <TelegramIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
