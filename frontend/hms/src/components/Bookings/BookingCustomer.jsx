import React, {  useState } from 'react';

import { TbEyeEdit, TbEyeExclamation, TbEyePlus } from 'react-icons/tb';
import BookingForm from './BookingForm';
import { BookingContext } from '../../pages/Booking';
import { useContext } from 'react';

const initialData = [
    { key: '1', name: 'A001', email: '123', phone: '1', status: 'đang chờ' },
    { key: '2', name: 'A001', email: '123', phone: '1', status: 'đang chờ' },
    { key: '3', name: 'A001', email: '123', phone: '1', status: 'đang thuê' },
    { key: '4', name: 'A001', email: '123', phone: '1', status: 'đang thuê' },
    { key: '5', name: 'A001', email: '123', phone: '1', status: 'đang thuê' },
    { key: '6', name: 'A001', email: '123', phone: '1', status: 'đang thuê' },
    { key: '7', name: 'A001', email: '123', phone: '1', status: 'đã hủy' },
    { key: '8', name: 'A001', email: '123', phone: '1', status: 'đang thuê' },
];

function BookingCustomer() {
    const booking = useContext(BookingContext);

    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState('');

    const handleClickPending = () => {
        setOpenModal(true);
        setAction('đang chờ');
    };

    const handleClickConfirmed = () => {
        setOpenModal(true);
        setAction('đang thuê');
    };

    const handleClickRuined = () => {
        setOpenModal(true);
        setAction('đã hủy');
    };

    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                <p>
                    {record.status === 'đang chờ' ? (
                        <p className="text-yellow-400 font-medium">đang chờ</p>
                    ) : record.status === 'đang thuê' ? (
                        <p className="text-green-400 font-medium">đang thuê</p>
                    ) : (
                        <p className="text-red-400 font-medium">đã hủy</p>
                    )}
                </p>
            ),
        },
        {
            title: '#',
            key: 'action',
            render: (_, record) => (
                <p className="text-[20px]">
                    {record.status === 'đang chờ' ? (
                        <TbEyePlus onClick={handleClickPending} className="cursor-pointer" />
                    ) : record.status === 'đang thuê' ? (
                        <TbEyeEdit onClick={handleClickConfirmed} className="cursor-pointer" />
                    ) : (
                        <TbEyeExclamation onClick={handleClickRuined} className="cursor-pointer" />
                    )}
                </p>
            ),
        },
    ];

    const getRoomByStatus = (data, status) => {
        booking.setDataTable(data.filter((item) => item.status === status));
    };

    booking.onClickCus = (e) => {
        let key = 100;

        if (Number(e.key) === key++) {
            booking.setDataTable(initialData);
        } else {
            ['đang chờ', 'đang thuê', 'đã hủy'].forEach((item) => {
                if (Number(e.key) === key++) getRoomByStatus(initialData, item);
            });
        }

        booking.setColumnTable(columns);
    };

    return (
        <div className="w-full">
            <BookingForm action={action} open={openModal} setOpen={setOpenModal} />
        </div>
    );
}

export default BookingCustomer;
