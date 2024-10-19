import { FaTrophy, FaNetworkWired, FaBullhorn } from "react-icons/fa";
import Image from "next/image";
import binanceIcon from "../images/binance.png";
import etheruemIcon from "../images/ethereum.png";
import arbitrumIcon from "../images/arbitrum.png";
import solanaIcon from "../images/solana.png";
import polygonIcon from "../images/polygon.png";
import tronIcon from "../images/tron.png";
import telegramIcon from "../images/telegram.png";
import twitterIcon from "../images/twitter.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isSidebarOpen }) => {
    const pathname = usePathname().split("/");

    return (
        <div
            className={`fixed left-0 top-16 h-full bg-black w-64 z-40 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 border-r-slate-500 border-r-[1px]`}
        >
            <div className="text-white py-4 space-y-4">
                <Link href={"/"} className="flex px-4 items-center space-x-2">
                    <FaTrophy className="text-blue-500" size={"22"} />
                    <span>Coin Lists</span>
                </Link>
                <div className="flex flex-col space-y-1 text-gray-300">
                    <Link
                        href={"/trade"}
                        className={
                            pathname.includes("trade")
                                ? "bg-blue-800 px-8"
                                : "px-8"
                        }
                    >
                        Most traded
                    </Link>
                    <Link
                        href={"/new"}
                        className={
                            pathname.includes("new") && pathname.length == 2
                                ? "bg-blue-800 px-8"
                                : "px-8"
                        }
                    >
                        New Coins
                    </Link>
                    <Link
                        href={"/trending"}
                        className={
                            pathname.includes("trending")
                                ? "bg-blue-800 px-8"
                                : "px-8"
                        }
                    >
                        Trending Coins
                    </Link>
                    <Link
                        href={"/gainers"}
                        className={
                            pathname.includes("gainers")
                                ? "bg-blue-800 px-8"
                                : "px-8"
                        }
                    >
                        Daily Gainers
                    </Link>
                </div>
                <Link
                    href={"/"}
                    className={`flex items-center space-x-2 mt-4 px-4 ${
                        pathname[1] == "" && "bg-blue-800  "
                    }`}
                >
                    <FaNetworkWired className="text-blue-500" size={"22"} />
                    <span>EVM Networks</span>
                </Link>
                <div className="ml-4 space-y-1 text-gray-300">
                    <Link
                        href={"/new/binance"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("binance") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={binanceIcon}
                            height={18}
                            width={18}
                            alt="binance"
                        />
                        <p>Binance</p>
                    </Link>
                    <Link
                        href={"/new/ethereum"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("ethereum") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={etheruemIcon}
                            height={18}
                            width={18}
                            alt="ethereum"
                        />
                        <p>Ethereum</p>
                    </Link>
                    <Link
                        href={"/new/arbitrum"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("arbitrum") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={arbitrumIcon}
                            height={18}
                            width={18}
                            alt="arbitrum"
                        />
                        <p>Arbitrum</p>
                    </Link>
                    <Link
                        href={"/new/solana"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("solana") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={solanaIcon}
                            height={18}
                            width={18}
                            alt="solana"
                        />
                        <p>Solana</p>
                    </Link>
                    <Link
                        href={"/new/polygon"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("polygon") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={polygonIcon}
                            height={18}
                            width={18}
                            alt="polygon"
                        />
                        <p>Polygon</p>
                    </Link>
                    <Link
                        href={"/new/tron"}
                        className={`flex items-center space-x-1 px-8 ${
                            pathname.includes("tron") && "bg-blue-800"
                        }`}
                    >
                        <Image
                            src={tronIcon}
                            height={18}
                            width={18}
                            alt="tron"
                        />
                        <p>Tron</p>
                    </Link>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 mt-4 px-4">
                        <FaBullhorn className="text-blue-500" size={"22"} />
                        <span>Advertise</span>
                    </div>

                    <div className="ml-4 text-gray-300 px-6">Promote Coin</div>
                </div>
                <div className="px-4 flex justify-center">
                    <button
                    onClick={() => {
                        window.location.href ="/submit"
                    }}
                        style={{
                            backgroundColor: "rgb(58, 131, 245, 0.8)",
                            border: "1px solid ",
                            color: "white",
                            padding: "10px 20px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: "5px",
                        }}
                        className=" font-bold p-2 mt-4 rounded w-full"
                    >
                        Submit Coin
                    </button>
                </div>
            </div>
            <div className="flex justify-center space-x-4  text-gray-400">
                <Image src={telegramIcon} height={25} width={25} alt="tron" />
                <Image src={twitterIcon} height={25} width={25} alt="tron" />
            </div>
        </div>
    );
};

export default Sidebar;
