// components/Banner.js
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { arrows: true, dots: true },
            },
            {
                breakpoint: 768,
                settings: { arrows: false, dots: true },
            },
        ],
    };

    const desktopBanners = [
        {
            src: "https://betfury.io/images/pages/main/slider/slide-1@2x.webp",
            alt: "Desktop Banner 1",
        },
        {
            src: "https://designshifu.com/wp-content/uploads/2022/11/Ad-banner-design-ideas-examples-that-get-the-maximum-clicks-1536x768.jpg",
            alt: "Desktop Banner 2",
        },
    ];

    const mobileBanners = [
        {
            src: "/betfury.png",
            alt: "Mobile Banner 1",
        },
        {
            src: "/faucetPay.png",
            alt: "Mobile Banner 2",
        },
        {
            src: "/freeBitcoin.jpeg",
            alt: "Mobile Banner 3",
        },
    ];

    return (
        <div className="mb-4 sm:mb-6">
            {/* Desktop Slider */}
            <div className="hidden md:block">
                <Slider {...settings} className="mx-2 sm:mx-4">
                    {desktopBanners.map((banner, index) => (
                        <div
                            key={index}
                            className="relative w-full h-[400px] sm:h-[500px] overflow-hidden"
                        >
                            <Image
                                src={banner.src}
                                alt={banner.alt}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Mobile Slider */}
            <div className="block md:hidden px-2">
                <Slider {...settings}>
                    {mobileBanners.map((banner, index) => (
                        <div
                            key={index}
                            className="relative w-full aspect-[16/9] overflow-hidden"
                        >
                            <Image
                                src={banner.src}
                                alt={banner.alt}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Banner;
