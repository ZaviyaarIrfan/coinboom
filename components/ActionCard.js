import React, { useState } from "react";
import {
    Box,
    Button,
    IconButton,
} from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn"; // Lightning icon for boost
import { useRouter } from "next/navigation";
import {
    RocketLaunch,
    Whatshot,
    Flag,
} from "@mui/icons-material";

const ActionsCard = () => {
    const [openPromote, setOpenPromote] = useState(false);
    const [openBoost, setOpenBoost] = useState(false);
    const router = useRouter();

    // Function to open/close the Promote modal
    const handleOpenPromote = () => {
        // setOpenPromote(true);
        router.push("/promote");
    };
    const handleClosePromote = () => {
        setOpenPromote(false);
    };

    // Function to open/close the Boost modal
    const handleOpenBoost = () => {
        setOpenBoost(true);
    };
    const handleCloseBoost = () => {
        setOpenBoost(false);
    };

    return (
<Box
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: {
            xs: "10px",  // padding for extra small screens
            sm: "0px"   // padding for small screens and up
        }
    }}
>
    <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<FlashOnIcon />}
        onClick={handleOpenPromote}
        sx={{
            transition: "all 0.3s ease",
            borderColor: "primary.main",
            maxWidth: {
                xs: "90%",    // width on mobile
                sm: "400px"   // width on larger screens
            },
            marginRight: {
                xs: "0",      // no margin on mobile
                sm: "30px"    // margin on larger screens
            },
            fontSize: {
                xs: "14px",   // smaller font on mobile
                sm: "16px"    // larger font on desktop
            },
            "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            }
        }}
    >
        Promote
    </Button>

    <Box
        className="mt-4"
        sx={{
            display: "flex",
            justifyContent: "center",
            gap: {
                xs: "10px",   // smaller gap on mobile
                sm: "16px"    // larger gap on desktop
            },
            flexWrap: "wrap", // allows wrapping on very small screens
            width: "100%"
        }}
    >
        {[
            { icon: <RocketLaunch />, label: "rocket" },
            { icon: <Whatshot />, label: "fire" },
            { icon: <Flag />, label: "flag" }
        ].map((item) => (
            <IconButton
                key={item.label}
                aria-label={item.label}
                sx={{
                    border: "1px solid blue",
                    borderRadius: "10px",
                    padding: {
                        xs: "8px 15px",  // smaller padding on mobile
                        sm: "10px 20px"  // larger padding on desktop
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    "&:hover": {
                        backgroundColor: "darkblue",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "blue !important",
                        fontSize: {
                            xs: "20px",   // smaller icon on mobile
                            sm: "24px"    // larger icon on desktop
                        }
                    },
                    "& p": {
                        color: "blue",
                        fontSize: {
                            xs: "16px",   // smaller text on mobile
                            sm: "20px"    // larger text on desktop
                        },
                        margin: 0
                    }
                }}
            >
                {item.icon}
                <p>1</p>
            </IconButton>
        ))}
    </Box>
</Box>
    );
};

export default ActionsCard;
