import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router';
import Catson from '../../images/catson.png';
import { Box, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // For copy icon
import Image from 'next/image'; // For handling images/icons
import ActionsCard from "../../components/ActionCard";

export default function Home() {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { name } = router.query; // Get the coin name from the URL

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


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
        const response = await fetch(`/api/get-coin?name=${encodeURIComponent(name)}`);
        const data = await response.json();

        if (response.ok) {
            
          setCoinData(data);
        } else {
          setError(data.error || 'Error fetching coin data');
        }
      } catch (err) {
        setError('Network error');
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
        <meta name="description" content={`Details for ${coinData.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Navbar */}
        <Navbar />
        
        <div className="min-h-screen bg-gray-800 py-16 text-white">
          <div className="mx-auto pt-16 pb-8 px-4">
            <Grid container spacing={4}>
            <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
                      <Typography variant="h4" gutterBottom>
                        {coinData.name} ({coinData.symbol}) {/* Coin name and symbol */}
                      </Typography>
                      <Box className="flex items-center">
                        <Typography variant="body1" className="mr-2">
                          {coinData.contractAddress} {/* Token contract address */}
                        </Typography>
                        <Tooltip title="Copy Address">
                          <IconButton onClick={handleCopyAddress} color="primary">
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
          <Box className="bg-gray-900 min-h-screen p-4 rounded-lg w-full">
                    <iframe
                      src={`https://dexscreener.com/${coinData.blockchain.toLowerCase()}/${coinData.contractAddress}?embed=1&theme=dark`}
                      width="100%"
                      
                      style={{ border: "none", borderRadius: "8px" ,minHeight: "150vh"}}
                      allow="clipboard-write"
                      allowFullScreen
                    ></iframe>
                  </Box>
        </div>
        <Footer />
      </main>
    </>
  );
}
