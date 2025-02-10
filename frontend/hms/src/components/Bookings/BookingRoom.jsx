import { message } from 'antd';
import React, { useEffect } from 'react';
import roomApi from '../../features/apis/roomApi';
import { typeRooms } from '../../databases/fontend-page';
import { useCallback } from 'react';
import { BookingContext } from '../../pages/Booking';
import { useContext } from 'react';
import BookingForm from './BookingForm';
import { useState } from 'react';

function BookingRoom() {
    const booking = useContext(BookingContext);
    
    const [openModal, setOpenModal] = useState(false);

    const fetchRooms = useCallback(async () => {
        try {
            const response = await roomApi.getRoom();
            booking.setDataTable(response.map((room) => ({ ...room, key: room.room_id })));
            booking.setColumnTable(columns);
        } catch (error) {
            message.error('Lỗi khi lấy dữ liệu phòng');
            console.log(error);
        }
    }, []);

    const columns = [
        { title: 'Số phòng', dataIndex: 'room_number', key: 'room_number' },
        { title: 'Loại phòng', dataIndex: 'type', key: 'type' },
        { title: 'Giá phòng', dataIndex: 'price', key: 'price' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        {
            title: '#',
            key: 'action',
            render: (_, record) => <p onClick={() => setOpenModal(true)}>#</p>,
        },
    ];

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    useEffect(() => {
    }, []);

    const getRoomByStatus = (dataRoom, status) => {
        booking.setDataTable(dataRoom.filter((room) => room.status === status));
    };

    const getRoomByType = (dataRoom, type) => {
        booking.setDataTable(dataRoom.filter((room) => room.type === type));
    };

    booking.onClickRoom = async (e) => {
        try {
            let key = 1;
            let check = false;
            const response = await roomApi.getRoom();

            if (Number(e.key) === key++) {
                booking.setDataTable(response.map((room) => ({ ...room, key: room.room_id })));
                check = true;
            }

            if (!check) {
                ['có sẵn', 'đã đặt', 'bảo trì'].forEach((item) => {
                    if (Number(e.key) === key++) {
                        getRoomByStatus(response, item);
                        check = true;
                    }
                });
            }

            if (!check) {
                typeRooms.forEach((type) => {
                    if (Number(e.key) === key++) getRoomByType(response, type);
                });
            }

            booking.setColumnTable(columns);
        } catch (error) {
            message.error('Lỗi khi lấy dữ liệu phòng');
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <BookingForm open={openModal} setOpen={setOpenModal} />
        </div>
    );
}

export default BookingRoom;
