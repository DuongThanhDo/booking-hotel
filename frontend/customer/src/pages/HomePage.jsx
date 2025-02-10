import React from 'react';
import { assets } from '../assets';
import { configs } from '../configs';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const navbars = [
    {
        name: 'Phòng',
        img: assets.images.rooms,
        link: configs.routes.rooms,
    },
    {
        name: 'Tiện nghi',
        img: assets.images.amenities,
        link: configs.routes.amenities,
    },
    {
        name: 'Về chúng tôi',
        img: assets.images.aboutUs,
        link: configs.routes.aboutUs,
    },
    {
        name: 'Liên hệ',
        img: assets.images.contact,
        link: configs.routes.contact,
    },
];

function HomePage() {
    return (
        <div>
            <Header styles={'snap-start'} />
            <div className="w-full text-3xl font-bold underline ">
                <div className="w-full h-[92.5vh] overflow-hidden">
                    <img className="w-full h-full object-cover object-center" src={assets.images.aboutUs} alt="video" />
                    {/* <video className="w-full h-full object-cover object-center" src={assets.videos.introHotel} autoPlay muted loop /> */}
                </div>
    
                <div>
                    {navbars.map((navbar, index) => (
                        <div className="w-full h-[100vh] relative snap-center" key={index}>
                            <img
                                className="w-full h-full object-cover object-center blur-[2px] brightness-[.9]"
                                src={navbar.img}
                                alt={navbar.name}
                            />
                            <div className="absolute top-[50%] text-gray-200 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <p className="text-[120px] font-bold mb-[80px] drop-shadow-2xl z-10">{navbar.name}</p>
                                <div className="flex justify-center">
                                    <Link
                                        className="px-[20px] text-[18px] py-[10px] bg-transparent border-4 rounded-md hover:bg-gray-500 transition-all"
                                        to={navbar.link}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer styles={'snap-end'} />
        </div>
    );
}

export default HomePage;
