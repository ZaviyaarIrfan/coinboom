import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import Catson from "../../images/catson.png";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Tooltip,
    Modal,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // For copy icon
import Image from "next/image"; // For handling images/icons
import ActionsCard from "../../components/ActionCard";
// import { storage } from '../firebase/config';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Home() {
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { name } = router.query; // Get the coin name from the URL
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        logoFile: null,
        logoUrl: "",
        description: "",
        websiteLink: "",
        telegramLink: "",
        twitterLink: "",
        discordLink: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (1MB = 1048576 bytes)
            if (file.size > 1048576) {
                setError("File size should not exceed 1MB");
                return;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                setError("Please upload an image file");
                return;
            }

            setFormData((prev) => ({
                ...prev,
                logoFile: file,
            }));
            setError("");
        }
    };

    const uploadImageToFirebase = async (file) => {
        try {
            // Create a unique file name
            const fileName = `token-logos/${Date.now()}-${file.name}`;
            const storageRef = ref(storage, fileName);

            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Failed to upload image");
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            let logoUrl = formData.logoUrl;

            // Upload image to Firebase if a new file is selected
            if (formData.logoFile) {
                logoUrl = await uploadImageToFirebase(formData.logoFile);
            }

            // Prepare data for API
            const submitData = {
                image: logoUrl,
                description: formData.description,
                websiteLink: formData.websiteLink,
                telegramLink: formData.telegramLink,
                twitterLink: formData.twitterLink,
                discordLink: formData.discordLink,
            };

            // Make API call
            const response = await fetch("/api/coins", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error("Failed to update token information");
            }

            // Reset form and close modal on success
            setFormData({
                logoFile: null,
                logoUrl: "",
                description: "",
                websiteLink: "",
                telegramLink: "",
                twitterLink: "",
                discordLink: "",
            });
            setIsUpdateModalOpen(false);
            // You might want to add a success toast/notification here
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(coinData.contractAddress);
        alert("Token address copied!");
    };

    useEffect(() => {
        const fetchCoinData = async () => {
            if (!name) return; // Exit if name is not yet defined

            try {
                const response = await fetch(
                    `/api/get-coin?name=${encodeURIComponent(name)}`
                );
                const data = await response.json();

                if (response.ok) {
                    setCoinData(data);
                } else {
                    setError(data.error || "Error fetching coin data");
                }
            } catch (err) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Head>
                <title>{coinData.name} | CoinBoom</title>
                <meta
                    name="description"
                    content={`Details for ${coinData.name}`}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* Navbar */}
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                <div
                    className={`min-h-screen bg-gray-800 py-16 text-white ${
                        isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
                >
                    <div className="mx-auto pt-16 pb-8 px-4">
                        <Grid container spacing={4}>
                            {/* Left Sidebar / Main Chart Section */}
                            <Grid item xs={12} md={8}>
                                <Box className="p-4 rounded-lg ">
                                    {/* Coin Header Section */}
                                    <Box className="flex items-center ">
                                        {/* Coin Icon */}
                                        <Box className="mr-2">
                                            <Image
                                                src={coinData.imageUrl} // Update this with the correct path to the coin icon
                                                alt="Coin Icon"
                                                width={70}
                                                height={70}
                                                className="rounded-[50%] "
                                            />
                                        </Box>
                                        {/* Coin Name and Contract */}
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                gutterBottom
                                            >
                                                {coinData.name} (
                                                {coinData.symbol}){" "}
                                                {/* Coin name and symbol */}
                                            </Typography>
                                            <Box className="flex items-center">
                                                <Typography
                                                    variant="body1"
                                                    className="mr-2"
                                                >
                                                    {coinData.contractAddress}{" "}
                                                    {/* Token contract address */}
                                                </Typography>
                                                <Tooltip title="Copy Address">
                                                    <IconButton
                                                        onClick={
                                                            handleCopyAddress
                                                        }
                                                        color="primary"
                                                    >
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* You can add more sections for displaying transaction data, charts, etc. */}
                                </Box>
                            </Grid>
                            {/* Right Sidebar */}
                            <Grid item xs={12} md={4}>
                                <ActionsCard />

                                {/* Other components like ActionsCard, TokenStats, LinksCard, etc. */}
                            </Grid>
                        </Grid>
                    </div>
                    {/* Additional content or components */}
                    {/* Replace the existing Box with DEX Screener with this conditional rendering */}
                    <Box className="bg-gray-900 min-h-screen p-4 rounded-lg w-full">
                        {coinData.isPresale &&
                        coinData.isPresale.toLowerCase() != "no" ? (
                            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                                <h2 className="text-2xl font-bold mb-2">
                                    Presale Live
                                </h2>
                                <p className="text-gray-300">
                                    Started at{" "}
                                    {coinData.launchDate || "Oct 10, 2024"}
                                </p>

                                <a
                                    href={coinData.presaleLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-black font-bold py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                                >
                                    <span>Presale Link</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>

                                <div className="mt-8 w-full max-w-2xl pt-8">
                                    <h3 className="text-xl font-semibold mb-4 text-left">
                                        About {coinData.name}
                                    </h3>
                                    <p className="text-gray-300 text-left">
                                        {coinData.description ||
                                            `${coinData.name} is the ultimate sports memeverse for all you degens! Whether youe're hyped about football, basketball, MMA, Dota 2, CS, or just love to sit back and enjoy the show, ${coinData.name} is where you belong. Dive into the one and only ${coinData.name} and find your crew!`}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <iframe
                                src={`https://dexscreener.com/${coinData.blockchain.toLowerCase()}/${
                                    coinData.contractAddress
                                }?embed=1&theme=dark`}
                                width="100%"
                                style={{
                                    border: "none",
                                    borderRadius: "8px",
                                    minHeight: "150vh",
                                }}
                                allow="clipboard-write"
                                allowFullScreen
                            ></iframe>
                        )}
                    </Box>
                    <div className="flex justify-center mt-8 mb-4">
                        <button
                            onClick={() => setIsUpdateModalOpen(true)}
                            className="bg-blue-500 w-full mx-20 hover:bg-blue-600 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Submit Token Information Update
                        </button>
                    </div>
                </div>
                <Modal
                    open={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    className="flex items-center justify-center"
                >
                    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 max-w-2xl w-[90%] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Update Token</h2>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-gray-300 mb-6">
                            Important! ONLY fill the data you want to change.
                        </p>

                        <form
                            onSubmit={handleUpdateSubmit}
                            className="space-y-6"
                        >
                            {/* Logo Upload Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Change logo
                                </h3>
                                <p className="text-sm text-gray-400 mb-2">
                                    Optimal dimensions 512×512px, size up to 1MB
                                </p>
                                <button
                                    type="button"
                                    className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-black transition-colors duration-200"
                                >
                                    Upload
                                </button>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full bg-[#2a2a2a] text-white rounded p-3 min-h-[100px]"
                                    placeholder="Describe your Token/NFT here. What is the goal, plans, why is this project unique?"
                                />
                            </div>

                            {/* Website Link */}
                            <div>
                                <label className="block mb-2">
                                    Website link
                                </label>
                                <input
                                    type="url"
                                    className="w-full bg-[#2a2a2a] text-white rounded p-3"
                                    placeholder="https://yourwebsite.com/"
                                />
                            </div>

                            {/* Telegram Link */}
                            <div>
                                <label className="block mb-2">
                                    Telegram link
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-[#2a2a2a] text-white rounded p-3"
                                    placeholder="Telegram"
                                />
                            </div>

                            {/* Twitter Link */}
                            <div>
                                <label className="block mb-2">
                                    Twitter link
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-[#2a2a2a] text-white rounded p-3"
                                    placeholder="Twitter"
                                />
                            </div>

                            {/* Discord Link */}
                            <div>
                                <label className="block mb-2">
                                    Discord link
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-[#2a2a2a] text-white rounded p-3"
                                    placeholder="Discord"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Submit Update
                            </button>
                        </form>
                    </div>
                </Modal>
                <Footer />
            </main>
        </>
    );
}
