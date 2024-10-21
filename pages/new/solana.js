import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import CoinsTable from "../../components/Table";
import TrendingNavigation from "../../components/TrendingNavigation";
import Footer from "../../components/Footer";
import PromoteTable from "../../components/PromoteTable";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [cryptoStats, setCryptoStats] = useState([]);

    const fetchCryptoStats = async () => {
        try {
            const response = await fetch("/api/new/solana");
            const data = await response.json();

            if (response.ok) {
                setCryptoStats(data);
                console.log("Crypto Stats:", data);
            } else {
                console.error("Error fetching crypto stats:", data.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        fetchCryptoStats();
    }, []);

    return (
        <>
            <Head>
                <title>CoinBoom</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <div
                    className={`min-h-screen bg-black text-white p-6 pt-20 transition-all duration-300 ${
                        isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
                >
                    <h2 className="text-2xl font-bold mb-3">Promoted Coins</h2>
                    <PromoteTable />
                    <h2 className="text-2xl font-bold my-4">
                        Latest Coins on SOL
                    </h2>
                    <TrendingNavigation />
                    <CoinsTable coinsData={cryptoStats} />
                </div>
            </main>
            <div
                className={` transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                }`}
            >
                <Footer />
            </div>
        </>
    );
}
