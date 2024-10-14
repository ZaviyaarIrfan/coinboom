import binanceIcon from "../images/binance.png";
import etheruemIcon from "../images/ethereum.png";
import arbitrumIcon from "../images/arbitrum.png";
import solanaIcon from "../images/solana.png";
import Image from "next/image";

const TrendingNavigation = () => {
    return (
        <div className="bg-gray-900 text-white p-1 rounded-md mb-4">
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2 bg-blue-500 text-black px-2 py-1 rounded-md">
                    <span className="text-blue-500">💎</span>
                    <span className="font-bold">Trending</span>
                    <div className="flex items-center space-x-2">
                        <span className="bg-gray-700 p-1 rounded">
                            <Image
                                src={binanceIcon}
                                height={18}
                                width={18}
                                alt="binance"
                            />
                        </span>
                        <span className="bg-gray-700 p-1 rounded">
                            <Image
                                src={etheruemIcon}
                                height={18}
                                width={18}
                                alt="ethereum"
                            />
                        </span>
                        <span className="bg-gray-700 p-1 rounded">
                            <Image
                                src={solanaIcon}
                                height={18}
                                width={18}
                                alt="solana"
                            />
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-red-500">🔥</span>
                    <span>Hot</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-300">🏷️</span>
                    <span>New</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-red-400">🚀</span>
                    <span>Gainers</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span>Watchlist</span>
                </div>
            </div>
        </div>
    );
};

export default TrendingNavigation;
