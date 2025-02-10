import React from 'react';
import ModalTable from '../common/ModalTable';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function BookingForm({ open, form, setOpen, action }) {
    const hadleClickConfim = () => {
        setOpen(false);
    };
    return (
        <div className="w-full">
            <ModalTable
                width={'800px'}
                title={'Phiếu đặt phòng'}
                form={form}
                open={open}
                setOpen={setOpen}
                handleSave={hadleClickConfim}
            >
                <div className="flex gap-8">
                    <div className="w-full">
                        <h2 className="font-medium mb-2">Thông Tin Cá Nhân</h2>
                        <Form.Item name="key" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên khách hàng"
                            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="request" label="Yêu cầu đặc biệt">
                            <TextArea />
                        </Form.Item>
                    </div>
                    <div className="w-full">
                        <h2 className="font-medium mb-2">Thông Tin đặt phòng</h2>
                        <Form.Item
                            name="name"
                            label="Ngày đến"
                            rules={[{ required: true, message: 'Vui lòng nhập tên ngày đến' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Ngày đi"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày đi' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            label="Số lượng khách"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng khách' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="roomType"
                            label="Loại phòng"
                            rules={[{ required: true, message: 'Vui lòng nhập loại phòng' }]}
                        >
                            <Select value={'123'} required>
                                <option value={123}>123</option>
                                <option value={123}>123</option>
                                <option value={123}>123</option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="listRoom"
                            label="Danh sách phòng"
                            rules={[{ required: true, message: 'Vui lòng nhập danh sách phòng' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </ModalTable>
        </div>
    );
}

export default BookingForm;
