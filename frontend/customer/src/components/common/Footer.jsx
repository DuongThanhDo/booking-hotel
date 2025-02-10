import React from 'react';
import { Button, Input } from 'antd';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { configs } from '../../configs';

const socialNetworks = [
    { icon: <FaFacebookSquare />, name: 'Facebook' },
    { icon: <FaYoutubeSquare />, name: 'Youtube' },
    { icon: <FaTwitterSquare />, name: 'Twitter' },
    { icon: <FaInstagramSquare />, name: 'Instagram' },
];

function Footer({ styles }) {
    return (
        <div className={`${styles} w-full flex justify-around bg-primary py-10 text-gray-300`}>
            <Link to={configs.routes.home} className="w-[20%] max-w-[250px] flex items-center">
                <img className="w-full rounded-tl-3xl rounded-br-3xl" src={logo} alt="logo" />
            </Link>

            {/* Thông tin liên hệ */}
            <ul>
                <p className="font-semibold text-[20px]">Thông tin liên hệ</p>
                <li className="my-4">Địa chỉ: phường An Cựu Thành phố Huế</li>
                <li>Số điện thoại: 0902207049</li>
                <li className="my-4">Email: Hoteldtd@gmail.com</li>
            </ul>

            {/* Mạng xã hội */}
            <ul>
                <p className="font-semibold text-[20px] mb-4">Mạng xã hội</p>
                {socialNetworks.map((item, index) => (
                    <li key={index} className="mb-2 flex gap-2 items-center">
                        {item.icon} <span>{item.name}</span>
                    </li>
                ))}
            </ul>

            {/* nhập email */}
            <div className="flex items-center">
                <div className="w-[250px] border-4 rounded-tl-2xl rounded-br-2xl p-5">
                    <p>Nhận thông báo về hoạt động của hotel DTD</p>
                    <div className=" flex gap-2 mt-4">
                        <Input placeholder="Nhập email..." />
                        <Button type="primary">Gửi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
