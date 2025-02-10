import React, { useState } from 'react';
import { Button, Checkbox, Input, message } from 'antd';
import { assets } from '../assets';
import { configs } from '../configs';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authApi from '../features/apis/authApi';
import { loginAdmin, loginStaff } from '../features/slices/authSlice';

function Login() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            console.log(1);

            const reponse = await authApi.login(inputEmail, inputPassword);
            console.log(reponse);
            if (reponse) {
                if (reponse.role === 'admin') dispatch(loginAdmin(reponse));
                else dispatch(loginStaff(reponse));
                message.success('Đăng nhập thành công');
                navigate('/');
            }
        } catch (error) {
            message.error('Sai email hoặc mật khẩu');
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <img
                className="w-full h-full fixed -z-10"
                src="https://img2.thuthuatphanmem.vn/uploads/2019/03/02/hinh-nen-powerpoint-xanh-duong-cuc-dep_012324053.jpeg"
                alt="background"
            />
            <div className="w-[500px] bg-white rounded-xl my-10 p-8 flex flex-col items-center justify-center">
                <Link to={configs.routes.home} className="w-[100px] my-4">
                    <img className="w-full h-full object-cover object-center" src={assets.images.logo} alt="logo" />
                </Link>
                <p className="text-[24px] font-medium">Đăng nhập tài khoản của bạn</p>
                <div className="w-full flex items-center justify-between my-4">
                    <div className="flex items-center gap-2 py-2 px-3 text-[15px] font-medium bg-gray-100 rounded-xl cursor-pointer">
                        <FaGoogle />
                        <p>Đăng nhập với Google</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-3 text-[15px] font-medium bg-gray-100 rounded-xl cursor-pointer">
                        <FaFacebookF />
                        <p>Đăng nhập với Facebook</p>
                    </div>
                </div>
                <div className="w-full border-t relative mt-4 mb-8">
                    <p className="px-5 py-2 bg-white absolute top-[-22px] left-[50%] translate-x-[-50%]">
                        Hoặc sử dụng Email
                    </p>
                </div>
                <Input
                    className="my-2 h-[40px]"
                    placeholder="Email address"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />
                <Input
                    className="h-[40px] mb-4"
                    placeholder="Password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="remember" className="cursor-pointer">
                        <Checkbox id="remember" /> Ghi nhớ tôi trên thiết bị này
                    </label>

                    <Link className="underline">Quên mật khẩu</Link>
                </div>
                <Button className="w-full h-[40px] mt-4 mb-2" type="primary" onClick={handleLogin}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Login;
