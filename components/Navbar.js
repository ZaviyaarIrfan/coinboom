import { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from "axios";
import Link from "next/link";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {
    const [search, setSearch] = useState("");
    const [bnbData, setBnbData] = useState();
    const [ethData, setEthData] = useState();
    const [solData, setSolData] = useState();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/navbar");
            setBnbData(res.data.data.BNB[0]);
            setEthData(res.data.data.ETH[0]);
            setSolData(res.data.data.SOL[0]);
        })();
    }, []);

    const handleSearch = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        try {
            const res = await axios.get(`/api/search?query=${query}`);
            setSearchResults(res.data);
        } catch (error) {
            console.error("Error searching for coins:", error);
            setSearchResults([]);
        }
    };

    useEffect(() => {
        handleSearch(search); 
    }, [search]);

    const SearchModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute top-0 left-0 right-0 bg-gray-900 p-4">
                <div className="flex items-center bg-gray-800 text-gray-400 rounded-md border border-blue-500 px-4 py-2 max-w-3xl mx-auto">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search coins..."
                        className="bg-transparent focus:outline-none text-white w-full"
                        autoFocus
                    />
                    <button
                        onClick={() => setIsSearchModalOpen(false)}
                        className="text-gray-400 ml-2"
                    >
                        ✕
                    </button>
                </div>

                {/* Search Results Container */}
                <div className="max-w-3xl mx-auto mt-2 bg-gray-800 rounded-md">
                    {search && searchResults.length > 0 ? (
                        <div className="p-2 space-y-2">
                            {searchResults.map((coin) => (
                                <Link
                                    href={`/coin/${coin?.id}`}
                                    key={coin.id}
                                    className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* <img
                                            src={coin.iconUrl}
                                            className="w-8 h-8 rounded-full"
                                            alt={`${coin.name} icon`}
                                        /> */}
                                        <div>
                                            <div className="text-white">
                                                {coin.name}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {coin.symbol}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="text-right">
                                        <div className="text-white">
                                            ${coin.price?.toFixed(2)}
                                        </div>
                                        <div
                                            className={
                                                coin.percentChange24h >= 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }
                                        >
                                            {coin.percentChange24h?.toFixed(2)}%
                                        </div>
                                    </div> */}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-gray-400 text-center">
                            No results found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <nav className="bg-black px-4 py-2 flex items-center justify-between border-b-slate-400 border-b-[1px] fixed top-0 w-full z-50">
                {/* Logo and Menu Icon */}
                <div className="flex items-center">
                    <FaBars
                        className="text-blue-500 text-2xl mr-4 cursor-pointer"
                        onClick={toggleSidebar}
                    />
                    <h1 className="text-blue-500 text-2xl font-bold">
                        Bob<span className="text-white">an</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <button
                    onClick={() => setIsSearchModalOpen(true)}
                    className="flex items-center bg-gray-800 text-gray-400 rounded-md border border-blue-500 px-4 py-1"
                >
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search coins..."
                        className="bg-transparent focus:outline-none text-white cursor-pointer"
                    />
                    <div className="ml-2">
                        <span className="text-white">▼</span>
                    </div>
                </button>

                {/* Cryptocurrency Prices */}
                <div className="flex items-center space-x-4 text-sm">
                    <Link
                        href={"https://coinmarketcap.com/currencies/bnb/"}
                        target="_blank"
                    >
                        <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                            <span className="text-blue-500">BNB</span>{" "}
                            <span className="text-green-500">
                                {bnbData?.quote?.USD?.percent_change_24h.toFixed(
                                    2
                                )}
                                %
                            </span>
                            <br />
                            <span>
                                ${bnbData?.quote?.USD?.price.toFixed(2)}
                            </span>
                        </div>
                    </Link>
                    <Link
                        href={"https://coinmarketcap.com/currencies/ethereum/"}
                        target="_blank"
                    >
                        <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                            <span className="text-blue-500">ETH</span>{" "}
                            <span className="text-green-500">
                                {ethData?.quote?.USD?.percent_change_24h.toFixed(
                                    2
                                )}
                                %
                            </span>
                            <br />
                            <span>
                                ${ethData?.quote?.USD?.price.toFixed(2)}
                            </span>
                        </div>
                    </Link>
                    <Link
                        href={"https://coinmarketcap.com/currencies/solana/"}
                        target="_blank"
                    >
                        <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                            <span className="text-blue-500">SOL</span>{" "}
                            <span className="text-green-500">
                                {solData?.quote?.USD?.percent_change_24h.toFixed(
                                    2
                                )}
                                %
                            </span>
                            <br />
                            <span>
                                ${solData?.quote?.USD?.price.toFixed(2)}
                            </span>
                        </div>
                    </Link>
                </div>
            </nav>
            {isSearchModalOpen && <SearchModal />}
            <Sidebar isSidebarOpen={isSidebarOpen} />
        </>
    );
}
