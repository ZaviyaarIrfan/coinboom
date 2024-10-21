import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// Function to format the volume
const formatVolume = (volume) => {
    if (volume == 0) {
        const num = Number(volume);
        return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    }
    if (!volume || volume === "--") {
        return "--";
    }
    const num = Number(volume);
    return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

export default function PromoteTable() {
    const [coinsData, setcoinsData] = useState([]);

    const fetchCryptoStats = async () => {
        try {
            const response = await fetch("/api/get-all-stats-1");
            const data = await response.json();
            const filteredData = data.filter((coin) => coin.isPromote)

            if (response.ok) {
                setcoinsData(filteredData);
                console.log("Crypto Stats:", data);
            } else {
                console.error("Error fetching crypto stats:", data.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    useEffect(() => {
        fetchCryptoStats();
    }, []);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Number of items per page

    // Calculate the range of items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoins = coinsData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <TableContainer component={Paper} className="bg-black text-white">
                <Table>
                    <TableHead>
                        <TableRow
                            className="bg-[#404040]"
                            sx={{ color: "white" }}
                        >
                            <TableCell className="text-white font-bold text-[0.95rem] py-[0.6rem]">
                                Coin
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                Price
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                Age
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                TXN 24h
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                Volume
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                1h
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                24h
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                7d
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                LP
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                MCap
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCoins.map((coin, index) => (
                            <TableRow
                                key={index}
                                className={`hover:bg-blue-900 transition-all ${
                                    index % 2 === 0
                                        ? "bg-[#262626]"
                                        : "bg-[#2a2a2a]"
                                }`}
                            >
                                <TableCell className="text-white font-semibold py-1">
                                    <Link href={`/coin/${coin.slug}`}>
                                        <div className="flex space-x-2 items-center">
                                            <Image
                                                src={coin.image}
                                                height={25}
                                                width={25}
                                                alt={coin.name}
                                            />
                                            <div className="flex flex-col space-y-1">
                                                <span>{coin.name}</span>
                                                <div className="flex space-x-1">
                                                    {coin.networks?.map(
                                                        (icon, idx) => (
                                                            <span key={idx}>
                                                                {icon}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin?.price
                                        ? coin.price.toString().toLowerCase() ==
                                          "presale"
                                            ? coin.price
                                            : "$" +
                                              parseFloat(coin.price)
                                                  .toFixed(5)
                                                  .replace(/\.?0+$/, "")
                                        : "--"}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.age || "--"}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.txn || "--"} 
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin?.volume_24h == 0
                                        ? "$0"
                                        : "$" + formatVolume(coin?.volume_24h)}
                                </TableCell>
                                <TableCell
                                    className={clsx(
                                        typeof coin?.percent_change_1h ==
                                            "number" &&
                                            coin?.percent_change_1h >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    )}
                                >
                                    {coin?.percent_change_1h
                                        ? coin?.percent_change_1h
                                              .toString()
                                              .toLowerCase() == "presale"
                                            ? coin?.percent_change_1h
                                            : coin?.percent_change_1h.toFixed(
                                                  2
                                              ) + "%"
                                        : "--"}
                                </TableCell>

                                <TableCell
                                    className={clsx(
                                        typeof coin?.percent_change_6h ==
                                            "number" &&
                                            coin?.percent_change_6h >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    )}
                                >
                                    {coin?.percent_change_6h
                                        ? coin?.percent_change_6h
                                              .toString()
                                              .toLowerCase() == "presale"
                                            ? coin?.percent_change_6h
                                            : coin?.percent_change_6h.toFixed(
                                                  2
                                              ) + "%"
                                        : "--"}
                                </TableCell>

                                <TableCell
                                    className={clsx(
                                        typeof coin?.percent_change_24h ==
                                            "number" &&
                                            coin?.percent_change_24h >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    )}
                                >
                                    {coin?.percent_change_24h
                                        ? coin?.percent_change_24h
                                              .toString()
                                              .toLowerCase() == "presale"
                                            ? coin?.percent_change_24h
                                            : coin?.percent_change_24h + "%"
                                        : "--"}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin?.lp || coin?.lp == 0
                                        ? "$" + formatVolume(coin?.lp)
                                        : "--"}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin?.market_cap || coin?.market_cap == 0
                                        ? "$" + formatVolume(coin?.market_cap)
                                        : "--"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {coinsData.length > itemsPerPage && (
                <div className="flex justify-center py-4">
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        style={{
                            backgroundColor: "rgb(58, 131, 245, 0.8)",
                            border: "1px solid gold",
                            color: "white",
                            padding: "10px 20px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: "5px",
                        }}
                    >
                        Coins {indexOfFirstItem + 1} to {indexOfLastItem} &gt;
                    </Button>
                </div>
            )}
        </>
    );
}
