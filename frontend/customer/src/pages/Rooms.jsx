import React, { useEffect, useState } from 'react';
import PageFrame from '../components/common/PageFrame';
import { configs } from '../configs';
import { assets } from '../assets';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import roomApi from '../features/apis/roomApi';

function Rooms() {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.room);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsFromApi = await roomApi.getNonRepeatRoomType();
                console.log(roomsFromApi);
                setRooms(roomsFromApi);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu phòng:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div>
            <PageFrame img={assets.images.rooms} name={'Phòng'}>
                <div className="grid grid-cols-2 gap-8">
                    {rooms.map((room, index) => (
                        <div key={index} className="h-[140px] flex gap-4">
                            <div className="flex-1 min-w-[220px] h-full rounded-lg overflow-hidden">
                                <img
                                    className="w-full h-full object-cover object-center"
                                    // src={assets.images.rooms}
                                    src={`${
                                        index === 0
                                            ? 'https://pix8.agoda.net/property/56145364/871816548/a7d0f703d87da465fbcd1bd54f8008db.jpeg?ce=0&s=1280x'
                                            : index === 1
                                            ? 'https://pix8.agoda.net/hotelImages/14694836/-1/976c0fed1add73fde4f9ae2717040b71.jpg?ca=13&ce=1&s=1280x'
                                            : index === 2
                                            ? 'https://pix8.agoda.net/property/56145364/871816577/6e417415f04b980c34cb5bf12c3ee35b.jpeg?ce=0&s=1280x'
                                            : index === 3
                                            ? 'https://pix8.agoda.net/hotelImages/14694836/-1/db072d01d946a8dc5ff62a53c4d11da3.jpg?ce=0&s=1280x'
                                            : index === 4
                                            ? 'https://pix8.agoda.net/property/56145364/871816577/caedf9ea0c541a98300d19fce9c4c0d7.jpeg?ce=0&s=1280x'
                                            : index === 5
                                            ? 'https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/523551847.jpg?k=72e7871fc8a69ccb39ed29009d2191f27874f8b58ced29f9ef748ed6a4d5222b&o=&s=1280x'
                                            : 'https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/268613257.jpg?k=8253dbc22779db2004e9801de013851bd4cd7d2c1bab2fd85b5502498d15b756&o=&s=1280x'
                                    }`}
                                    alt="room"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <p className="h-[40%] overflow-hidden text-[16px] font-semibold ">{room.type}</p>
                                {/* <p className="overflow-hidden whitespace-nowrap text-[14px] text-gray-600">
                                    {room.status}
                                </p> */}
                                <p>{room.price} vnđ</p>
                                <Button className="absolute bottom-0">
                                    <Link to={configs.routes.bookingForm} state={room}>
                                        Đặt phòng ngay
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </PageFrame>
        </div>
    );
}

export default Rooms;
