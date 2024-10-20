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
    };

    const banners = [
        { src: "https://designshifu.com/wp-content/uploads/2022/11/Ad-banner-design-ideas-examples-that-get-the-maximum-clicks-1536x768.jpg", alt: "Banner 1" },
        { src: "https://designshifu.com/wp-content/uploads/2022/11/Ad-banner-design-ideas-examples-that-get-the-maximum-clicks-1536x768.jpg", alt: "Banner 2" },
        { src: "https://designshifu.com/wp-content/uploads/2022/11/Ad-banner-design-ideas-examples-that-get-the-maximum-clicks-1536x768.jpg", alt: "Banner 3" },
    ];

    return (
        <div className="mb-6">
            {/* Desktop Slider */}
            <div className="hidden md:block">
                <Slider {...settings} className="mx-4">
                    {banners.map((banner, index) => (
                        <div key={index}>
                            <Image
                                src={banner.src}
                                alt={banner.alt}
                                width={800}
                                height={200}
                                className="flex justify-center mx-auto"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            {/* Mobile Single Image */}
            <div className="block md:hidden">
                <Image
                    src={banners[0].src}
                    alt={banners[0].alt}
                    width={1200}
                    height={300}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Banner;
