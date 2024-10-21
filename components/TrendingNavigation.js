import { useState, useEffect } from "react";
import binanceIcon from "../images/binance.png";
import ethereumIcon from "../images/ethereum.png";
import solanaIcon from "../images/solana.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const TrendingNavigation = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const [isMounted, setIsMounted] = useState(false);

    // Set the mounted state to true after the component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const NetworkIcons = () => (
        <div className="flex items-center space-x-2">
            <Link
                href={`${currentPath}/binance`}
                className="bg-gray-700 p-1 rounded"
            >
                <Image src={binanceIcon} height={18} width={18} alt="binance" />
            </Link>
            <Link
                href={`${currentPath}/ethereum`}
                className="bg-gray-700 p-1 rounded"
            >
                <Image
                    src={ethereumIcon}
                    height={18}
                    width={18}
                    alt="ethereum"
                />
            </Link>
            <Link
                href={`${currentPath}/solana`}
                className="bg-gray-700 p-1 rounded"
            >
                <Image src={solanaIcon} height={18} width={18} alt="solana" />
            </Link>
        </div>
    );

    if (!isMounted) return null; // Prevent rendering on the server

    return (
        <div className="bg-gray-900 text-white p-1 rounded-md mb-4">
            <div className="flex space-x-4">
                {["trending", "hot", "new", "gainers", "watchlist"].map(
                    (tab) => (
                        <Link key={tab} href={`/${tab == 'hot' ? 'trade' : tab}`}>
                            <div
                                className={`flex items-center space-x-2 px-2 py-1 rounded-md ${
                                    currentPath.includes(`/${tab == 'hot' ? 'trade' : tab}`)
                                        ? "bg-blue-500 text-black"
                                        : ""
                                }`}
                            >
                                <span>
                                    {tab === "trending" && "💎"}
                                    {tab === "hot" && "🔥"}
                                    {tab === "new" && "🏷️"}
                                    {tab === "gainers" && "🚀"}
                                    {tab === "watchlist" && "⭐"}
                                </span>
                                <span className="font-bold capitalize">
                                    {tab}
                                </span>
                                {currentPath.includes(`/${tab == 'hot' ? 'trade' : tab}`) && <NetworkIcons />}
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    );
};

export default TrendingNavigation;
