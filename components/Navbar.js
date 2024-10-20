import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function Navbar({isSidebarOpen, toggleSidebar}) {
    const [search, setSearch] = useState("");

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
                <div className="flex items-center bg-gray-800 text-gray-400 rounded-md border border-blue-500 px-4 py-1">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search coins..."
                        className="bg-transparent focus:outline-none text-white"
                    />
                    <div className="ml-2">
                        <span className="text-white">▼</span>
                    </div>
                </div>

                {/* Cryptocurrency Prices */}
                <div className="flex items-center space-x-4 text-sm">
                    <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                        <span className="text-blue-500">BNB</span>{" "}
                        <span className="text-green-500">1.60%</span>
                        <br />
                        <span>$577.60</span>
                    </div>
                    <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                        <span className="text-blue-500">ETH</span>{" "}
                        <span className="text-green-500">1.24%</span>
                        <br />
                        <span>$2456.00</span>
                    </div>
                    <div className="bg-gray-800 text-white rounded-md px-3 py-1">
                        <span className="text-blue-500">SOL</span>{" "}
                        <span className="text-green-500">2.66%</span>
                        <br />
                        <span>$146.81</span>
                    </div>
                </div>
            </nav>
            <Sidebar isSidebarOpen={isSidebarOpen}/>
        </>
    );
}
