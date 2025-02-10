import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { assets } from '../../assets';
import { configs } from '../../configs';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/slices/authSlice';

function Header() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const handleClickLogout = () => {
        dispatch(logout());
    };

    const items = [
        {
            key: 0,
            label: (
                <div className="min-w-[200px] m-2 flex flex-col">
                    <Button className="w-full">
                        <Link className="w-full" to={configs.routes.bookingForm}>
                            Tiện ích
                        </Link>
                    </Button>
                    <Button className="w-full my-2">
                        <Link className="w-full" to={configs.routes.login} onClick={handleClickLogout}>
                            Đăng xuất
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-[100vw] h-[60px] flex items-center justify-between pr-10 pl-16 border border-b">
            <Link to={configs.routes.home} className="h-[80%] cursor-pointer">
                <img className="h-full" src={assets.images.logo} alt="logo" />
            </Link>
            {authState.isAuthenticated ? (
                <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft" arrow>
                    <div className="w-[24px] h-[24px] overflow-hidden rounded-full cursor-pointer">
                        <img
                            src="https://i.pinimg.com/564x/4b/b2/bb/4bb2bb45bd21bb55053cebbd672b85f2.jpg"
                            alt="avatar"
                        />
                    </div>
                </Dropdown>
            ) : (
                <Link to={configs.routes.login} className="h-[60%]">
                    <Button className="h-full" type="primary">
                        Đăng nhập
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
