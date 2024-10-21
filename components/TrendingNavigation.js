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
            {["binance", "ethereum", "solana"].map((network) => {
                // If the current path contains any network, replace it with the clicked one
                const basePath = currentPath.replace(/\/(binance|ethereum|solana)/, "");
                const href = `${basePath}/${network}`;

                return (
                    <Link
                        key={network}
                        href={href}
                        className="bg-gray-700 p-1 rounded"
                    >
                        <Image
                            src={
                                network === "binance"
                                    ? binanceIcon
                                    : network === "ethereum"
                                    ? ethereumIcon
                                    : solanaIcon
                            }
                            height={18}
                            width={18}
                            alt={network}
                        />
                    </Link>
                );
            })}
        </div>
    );

    if (!isMounted) return null; // Prevent rendering on the server

    return (
        <div className="bg-gray-900 text-white p-1 rounded-md mb-4">
            <div className="flex space-x-4">
                {["trending", "hot", "new", "gainers"].map(
                    (tab) => (
                        <Link
                            key={tab}
                            href={`/${tab == "hot" ? "trade" : tab}`}
                        >
                            <div
                                className={`flex items-center space-x-2 px-2 py-1 rounded-md ${
                                    currentPath.includes(
                                        `/${tab == "hot" ? "trade" : tab}`
                                    )
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
                                {currentPath.includes(
                                    `/${tab == "hot" ? "trade" : tab}`
                                ) && <NetworkIcons />}
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    );
};

export default TrendingNavigation;
