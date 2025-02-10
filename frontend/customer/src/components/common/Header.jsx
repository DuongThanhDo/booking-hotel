import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FaListUl, FaOpencart } from 'react-icons/fa';
import { Button, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/slices/authSlice';

import { configs } from '../../configs';
import { assets } from '../../assets';

const navbars = [
    { name: 'Trang chủ', link: configs.routes.home },
    { name: 'Phòng', link: configs.routes.rooms },
    { name: 'Tiện nghi', link: configs.routes.amenities },
    { name: 'Về chúng tôi', link: configs.routes.aboutUs },
    { name: 'Liên hệ', link: configs.routes.contact },
];

function Header({ styles }) {
    const authState = useSelector((state) => state.auth);
    console.log(authState);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const notLoggedIn = [
        {
            key: 0,
            label: (
                <div className="min-w-[200px] m-2">
                    <Button className="w-full">
                        <Link className="w-full" to={configs.routes.bookingForm}>
                            Đơn đặt chỗ
                        </Link>
                    </Button>
                    <p className="my-2 cursor-default">Đăng nhập</p>
                    <Button className="w-full">
                        <Link className="w-full" to={configs.routes.login}>
                            Đăng nhập
                        </Link>
                    </Button>
                    <Button type="primary" className="my-2 w-full">
                        <Link className="w-full" to={configs.routes.register}>
                            Tạo tài khoản
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];
    const logged = [
        {
            key: 0,
            label: (
                <div className="min-w-[200px] m-2">
                    <Button className="w-full">
                        <Link className="w-full" to={configs.routes.bookingForm}>
                            Đơn đặt chỗ
                        </Link>
                    </Button>
                    <Button className="w-full my-2" onClick={handleLogout}>
                        <Link className="w-full" to={configs.routes.login}>
                            Đăng xuất
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className={`${styles} w-full h-[60px] flex justify-between items-center px-10 border-b-2 bg-white z-50`}>
            {/* logo */}
            <Link to={configs.routes.home} className="h-[70%] ">
                <img src={assets.images.logo} alt="logo" className="h-full" />
            </Link>

            {/* Thanh điều hướng */}
            <div className="h-full flex items-center">
                {navbars.map((navbar, index) => (
                    <NavLink
                        key={index}
                        className={(nav) =>
                            `${nav.isActive && 'text-[#2389C9]'}
                            
                            h-full px-3 border-b-2 border-transparent flex items-center hover:border-gray-500 hover:text-[#2389C9] transition-all`
                        }
                        to={navbar.link}
                    >
                        {navbar.name}
                    </NavLink>
                ))}
            </div>

            {/* Tiện ích */}
            <div className="flex gap-6 text-[24px]">
                <Link to={configs.routes.cart}>
                    <FaOpencart className="cursor-pointer" />
                </Link>
                <Dropdown
                    menu={{ items: authState.isAuthenticated ? logged : notLoggedIn }}
                    trigger={['click']}
                    placement="bottomLeft"
                    arrow
                >
                    {authState.isAuthenticated ? (
                        <div className="w-[20px] h-[20px] overflow-hidden rounded-full cursor-pointer">
                            <img
                                src="https://i.pinimg.com/564x/4b/b2/bb/4bb2bb45bd21bb55053cebbd672b85f2.jpg"
                                alt="avatar"
                            />
                        </div>
                    ) : (
                        <FaListUl className="cursor-pointer" />
                    )}
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;
