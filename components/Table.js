import React, { useState } from "react";
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

const getChangeColor = (change) => {
    if (change.includes("-")) {
        return "text-red-500";
    } else if (change === "--") {
        return "text-gray-500";
    }
    return "text-green-500";
};

export default function CoinsTable({ coinsData }) {
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
                        <TableRow className="bg-[#404040]">
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
                                TXN
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                Volume
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                5m
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                1h
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                6h
                            </TableCell>
                            <TableCell className="text-white font-bold text-[0.95rem] py-1">
                                24h
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
                                    <div className="flex space-x-2 items-center">
                                        <Image
                                            src={coin.image}
                                            height={25}
                                            width={25}
                                            alt="binance"
                                        />
                                        <div className="flex flex-col space-y-1">
                                            <span>{coin.name}</span>
                                            <div className="flex space-x-1">
                                                {coin.networks.map(
                                                    (icon, idx) => (
                                                        <span key={idx}>
                                                            {icon}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.price}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.age}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.txn}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.volume}
                                </TableCell>
                                <TableCell
                                    className={getChangeColor(coin.change5m)}
                                >
                                    {coin.change5m}
                                </TableCell>
                                <TableCell
                                    className={getChangeColor(coin.change1h)}
                                >
                                    {coin.change1h}
                                </TableCell>
                                <TableCell
                                    className={getChangeColor(coin.change6h)}
                                >
                                    {coin.change6h}
                                </TableCell>
                                <TableCell
                                    className={getChangeColor(coin.change24h)}
                                >
                                    {coin.change24h}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.lp}
                                </TableCell>
                                <TableCell className="text-white">
                                    {coin.mcap}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {coinsData.length > 100 && (
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
