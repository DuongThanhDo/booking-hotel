import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useLocation } from 'react-router-dom';
import { assets } from '../assets';
import { useDispatch } from 'react-redux';
import { addCart } from '../features/slices/cartSlice';
import roomApi from '../features/apis/roomApi';

const BookingForm = () => {
    const dipatch = useDispatch();

    const location = useLocation();
    console.log(location);
    const [rooms, setRooms] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkin: '',
        checkout: '',
        guests: 1,
        roomType: '',
        paymentMethod: 'credit-card',
        terms: false,
    });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsFromApi = await roomApi.getNonRepeatRoomType();
                console.log(roomsFromApi, roomsFromApi[0].type);

                setFormData({
                    ...formData,
                    roomType: roomsFromApi[0].type,
                });
                setRooms(roomsFromApi);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu phòng:', error);
            }
        };

        fetchRooms();
        if (location.state) {
            setFormData({
                ...formData,
                roomType: location.state.name,
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleChangeSelect = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý việc gửi form ở đây
        console.log(formData);
    };

    const handleAddCart = () => {
        dipatch(addCart({ ...formData, paymentStatus: false }));
        alert('Đã thêm vào giỏ hàng!');
    };

    return (
        <div className="bg-[#F4F4F4] flex items-center justify-center py-6">
            <form className="max-w-[1000px] p-4 bg-white">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <h2 className="text-[18px] font-medium mb-2">Thông Tin Cá Nhân</h2>
                        <label htmlFor="name">Tên:</label>
                        <Input
                            className="my-2"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <Input
                            className="my-2"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phone">Số Điện Thoại:</label>
                        <Input
                            className="my-2"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-[18px] font-medium mb-2">Thông Tin Đặt Phòng</h2>
                        <label htmlFor="checkin">Ngày Đến:</label>
                        <Input
                            className="my-2"
                            type="date"
                            id="checkin"
                            name="checkin"
                            value={formData.checkin}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="checkout">Ngày Đi:</label>
                        <Input
                            className="my-2"
                            type="date"
                            id="checkout"
                            name="checkout"
                            value={formData.checkout}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="guests">Số Lượng Khách:</label>
                        <Input
                            className="my-2"
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            min="1"
                        />

                        <label htmlFor="roomType">Loại Phòng: </label>
                        <Select
                            className="my-2"
                            id="roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={(e) => handleChangeSelect(e, 'roomType')}
                            required
                        >
                            {rooms.map((room, index) => (
                                <option key={index} value={room.type}>
                                    {room.type}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>

                <label htmlFor="specialRequests">Yêu Cầu Đặc Biệt:</label>
                <TextArea
                    className="my-2"
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                ></TextArea>

                <label htmlFor="paymentMethod">Phương Thức Thanh Toán: </label>
                <Select
                    className="my-2"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) => handleChangeSelect(e, 'paymentMethod')}
                    required
                >
                    <option value="credit-card">Thẻ Tín Dụng</option>
                    <option value="debit-card">Thẻ Ghi Nợ</option>
                    <option value="paypal">PayPal</option>
                </Select>
                <br />

                <label htmlFor="cardNumber">Số Thẻ:</label>
                <Input
                    className="mt-2 mb-4"
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                />

                <label>
                    <Checkbox
                        className="flex-1"
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                    />{' '}
                    Tôi đồng ý với các điều khoản và điều kiện
                </label>

                <div className="float-end">
                    <Button onClick={handleAddCart}>Thêm vào giỏ hàng</Button>
                    <Button className="ml-4" type="primary" onClick={handleSubmit}>
                        Yêu cầu Đặt Phòng
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
