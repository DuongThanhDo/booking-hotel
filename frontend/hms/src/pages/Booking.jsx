import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { BookingCustomer, BookingRoom } from '../components/Bookings';
import roomApi from '../features/apis/roomApi';
import { createContext } from 'react';
import BookingMenu from '../components/Bookings/BookingMenu';

export const BookingContext = createContext();

const Booking = () => {
    const [dataTable, setDataTable] = useState([]);
    const [columnTable, setColumnTable] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await roomApi.getRoom();
                setDataTable(response.map((room) => ({ ...room, key: room.room_id })));
            } catch (error) {
                message.error('Lỗi khi lấy dữ liệu phòng');
                console.log(error);
            }
        };

        fetchRooms();
    }, []);

    const onClickRoom = () => {};
    const onClickCus = () => {};

    const value = {
        dataTable,
        setDataTable,
        columnTable,
        setColumnTable,
        onClickCus,
        onClickRoom,
    };

    return (
        <BookingContext.Provider value={value}>
            <div className="m-4">
                <p className="text-[24px] font-semibold mb-4">
                    <i>Đặt phòng khách sạn</i>
                </p>

                <div className="w-full h-[calc(100vh-142px)] bg-white flex gap-4 p-4 rounded-lg shadow-xl">
                    <Table
                        className="flex-1 h-full"
                        size="middle"
                        bordered
                        columns={columnTable}
                        dataSource={dataTable}
                    />
                    <div className="w-[220px] h-full flex flex-col gap-2 overflow-hidden overscroll-y-auto">
                        <BookingMenu />
                        <BookingRoom />
                        <BookingCustomer />
                    </div>
                </div>
            </div>
        </BookingContext.Provider>
    );
};
export default Booking;