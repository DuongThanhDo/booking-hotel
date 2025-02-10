import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Table, message, Spin, Select } from 'antd';
import { LiaEditSolid } from 'react-icons/lia';
import ModalTable from '../components/common/ModalTable';
import PageHeader from '../components/common/PageHeader';
import roomApi from '../features/apis/roomApi';
import { typeRoom, typeRooms } from '../databases/fontend-page';

function Room() {
    const [dataRooms, setDataRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingRoom, setEditingRoom] = useState(false);
    const [form] = Form.useForm();

    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await roomApi.getRoom();
                setDataRooms(response.map((room) => ({ ...room, key: room.room_id })));
            } catch (error) {
                message.error('Lỗi khi lấy dữ liệu phòng');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleSearch = () => console.log(1);

    const handleAddRoom = () => {
        setOpenModal(true);
        form.setFieldsValue({ room_id: '', room_number: '', type: '', price: '', status: 'có sẵn' });
    };

    const handleDeleteRoom = async () => {
        try {
            for (const id of selectedRowKeys) {
                await roomApi.deleteRoom(id);
            }

            setDataRooms(dataRooms.filter((room) => !selectedRowKeys.includes(room.room_id)));
            setSelectedRowKeys([]);
            message.success('Xóa phòng thành công');
        } catch (error) {
            message.error('Lỗi khi xóa phòng');
            console.log(error);
        }
    };

    const handleEditRoom = (record) => {
        setOpenModal(true);
        setEditingRoom(true);
        form.setFieldsValue(record);
    };

    const handleSaveRoom = () => {
        form.validateFields()
            .then(async (values) => {
                // Chỉnh sửa thông tin phòng
                if (editingRoom) {
                    try {
                        await roomApi.editRoom(values.room_id, values);
                        setDataRooms(dataRooms.map((room) => (room.room_id === values.room_id ? values : room)));
                        setEditingRoom(false);
                        message.success('Cập nhật phòng thành công');
                    } catch (error) {
                        message.error('Lỗi khi cập nhật phòng');
                        console.log(error);
                    }
                }
                // Thêm mới phòng
                else {
                    try {
                        const response = await roomApi.addRoom(values);
                        setDataRooms([...dataRooms, { ...response, key: response.room_id }]);
                        message.success('Thêm phòng thành công');
                    } catch (error) {
                        message.error('Lỗi khi thêm phòng');
                        console.log(error);
                    }
                }
                form.resetFields();
                setOpenModal(false);
            })
            .catch((errorInfo) => {
                message.error('Vui lòng điền đầy đủ thông tin');
            });
    };

    const columns = [
        { title: 'Số phòng', dataIndex: 'room_number', key: 'room_number' },
        { title: 'Loại phòng', dataIndex: 'type', key: 'type' },
        { title: 'Giá phòng', dataIndex: 'price', key: 'price' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        {
            title: '#',
            key: 'action',
            render: (_, record) => (
                <LiaEditSolid className="cursor-pointer text-[20px]" onClick={() => handleEditRoom(record)} />
            ),
        },
    ];

    return (
        <div className="m-4 mb-[100px]">
            <Spin spinning={loading}>
                <ModalTable
                    form={form}
                    setOpen={setOpenModal}
                    open={openModal}
                    handleSave={handleSaveRoom}
                    title={editingRoom ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
                >
                    <Form.Item name="room_id" label="Mã phòng" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="room_number"
                        label="Số phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập số phòng' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Loại phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập loại phòng' }]}
                    >
                        <Select
                            options={typeRooms.map((typeRoom) => ({ label: <span>{typeRoom}</span>, value: typeRoom }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập giá phòng' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Vui lòng nhập trạng thái' }]}
                    >
                        <Select
                            options={[
                                { label: <span>có sẵn</span>, value: 'có sẵn' },
                                { label: <span>đã đặt</span>, value: 'đã đặt' },
                                { label: <span>bảo trì</span>, value: 'bảo trì' },
                            ]}
                        />
                    </Form.Item>
                </ModalTable>

                <PageHeader title="Quản lý phòng" search={handleSearch} add={handleAddRoom} del={handleDeleteRoom} />
                <Table
                    rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                    columns={columns}
                    dataSource={dataRooms}
                    size="middle"
                    bordered
                />
            </Spin>
        </div>
    );
}

export default Room;
