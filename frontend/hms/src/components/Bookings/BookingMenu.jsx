import React from 'react';
import { Menu } from 'antd';
import { typeRooms } from '../../databases/fontend-page';
import { useContext } from 'react';
import { BookingContext } from '../../pages/Booking';

var keyRoom = 1;
var keyCus = 100;

const items = [
    {
        key: 'room',
        label: 'Phòng',
        children: [
            { key: keyRoom++, label: 'Tất cả' },
            {
                key: 'roomStatus',
                label: 'Trạng thái',
                children: [
                    { key: keyRoom++, label: 'Có sẵn' },
                    { key: keyRoom++, label: 'Đã đặt' },
                    { key: keyRoom++, label: 'Bảo trì' },
                ],
            },
            {
                key: 'roomType',
                label: 'Loại phòng',
                children: typeRooms.map((typeRoom) => ({ key: keyRoom++, label: typeRoom })),
            },
        ],
    },
    {
        key: 'customer',
        label: 'Khách hàng',
        children: [
            { key: keyCus++, label: 'Tất cả' },
            {
                key: 'status',
                label: 'Trạng thái',
                children: [
                    { key: keyCus++, label: 'Đang chờ' },
                    { key: keyCus++, label: 'Đang thuê' },
                    { key: keyCus++, label: 'Đã hủy' },
                ],
            },
        ],
    },
];

function BookingMenu() {
    const booking = useContext(BookingContext);

    const onClick = (e) => {
        if (Number(e.key) < 100) {
            booking.onClickRoom(e);
        } else {
            booking.onClickCus(e);
        }
    };
    return (
        <div>
            <Menu
                className="w-full border rounded-lg"
                onClick={onClick}
                defaultSelectedKeys={'1'}
                defaultOpenKeys={['room']}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default BookingMenu;
