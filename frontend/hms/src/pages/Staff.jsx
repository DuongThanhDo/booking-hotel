import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, message, Table, Spin, InputNumber, Select } from 'antd';
import { LiaEditSolid } from 'react-icons/lia';
import ModalTable from '../components/common/ModalTable';
import PageHeader from '../components/common/PageHeader';
import staffApi from '../features/apis/staffApi';

const Staff = () => {
    const [dataStaffs, setDataStaffs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingStaff, setEditingStaff] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const fetchStaffs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await staffApi.getStaff();
            setDataStaffs(
                response.map((staff) => ({
                    ...staff,
                    name: staff.profile.name,
                    phone: staff.profile.phone,
                    address: staff.profile.address,
                    position: staff.staff.position,
                    key: staff.user_id,
                })),
            );
        } catch (error) {
            message.error('Không lấy được dữ liệu');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStaffs();
    }, [fetchStaffs]);

    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

    const handleSearch = () => console.log(1);

    const handleAddStaff = () => {
        setOpenModal(true);
        form.resetFields();
        setEditingStaff(false);
    };

    const handleDeleteStaff = async () => {
        try {
            for (const id of selectedRowKeys) {
                await staffApi.deleteStaff(id);
            }

            setDataStaffs(dataStaffs.filter((staff) => !selectedRowKeys.includes(staff.key)));
            setSelectedRowKeys([]);
            message.success('Xóa nhân viên thành công');
        } catch (error) {
            message.error('Lỗi khi xóa nhân viên');
            console.error(error);
        }
    };

    const handleEditStaff = (record) => {
        setOpenModal(true);
        setEditingStaff(true);
        form.setFieldsValue(record);
    };

    const handleSaveStaff = () => {
        form.validateFields()
            .then(async (values) => {
                try {
                    // Chỉnh sửa thông tin sinh viên
                    if (editingStaff) {
                        console.log(values);

                        await staffApi.editStaff(values.user_id, values);
                        setDataStaffs(
                            dataStaffs.map((staff) => (staff.key === values.user_id ? { ...staff, ...values } : staff)),
                        );
                        message.success('Cập nhật nhân viên thành công');
                    }
                    // Thêm mới nhân viên
                    else {
                        const newStaff = await staffApi.addStaff({ ...values, role: 'staff' });
                        const response = await staffApi.getStaffById(newStaff.user_id);
                        console.log(response);
                        console.log(typeof response);

                        if (response && typeof response !== 'string') {
                            setDataStaffs([
                                ...dataStaffs,
                                {
                                    ...response,
                                    name: response.profile.name,
                                    phone: response.profile.phone,
                                    address: response.profile.address,
                                    position: response.staff.position,
                                    key: response.user_id,
                                },
                            ]);
                            message.success('Thêm nhân viên thành công');
                        } else message.error(response);
                    }
                    setOpenModal(false);
                } catch (error) {
                    message.error('Lỗi khi lưu thông tin nhân viên');
                    console.error(error);
                } finally {
                    form.resetFields();
                }
            })
            .catch(() => {
                message.error('Vui lòng điền đầy đủ thông tin');
            });
    };

    const columns = [
        { title: 'Họ và Tên', dataIndex: 'name', key: 'name' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Vị trí làm việc', dataIndex: 'position', key: 'position' },
        { title: 'Tên người dùng', dataIndex: 'user_name', key: 'user_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: '#',
            key: 'action',
            render: (_, record) => (
                <LiaEditSolid className="cursor-pointer text-[20px]" onClick={() => handleEditStaff(record)} />
            ),
        },
    ];

    return (
        <div className="m-4 mb-[100px]">
            <Spin spinning={loading}>
                <ModalTable
                    width={'800px'}
                    form={form}
                    setOpen={setOpenModal}
                    open={openModal}
                    handleSave={handleSaveStaff}
                    title={editingStaff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
                >
                    <div className="flex justify-between gap-4">
                        <div className="w-full">
                            <Form.Item name="user_id" label="Mã nhân viên" hidden>
                                <Input />
                            </Form.Item>
                            {!editingStaff && (
                                <>
                                    <p className="font-medium">Tài khoản nhân viên</p>
                                    <Form.Item
                                        name="user_name"
                                        label="Tên người dùng"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
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
                                        name="password"
                                        label="Mật khẩu"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </>
                            )}
    
                            <p className="font-medium">Công việc</p>
                            <Form.Item
                                name="position"
                                label="Vị trí làm việc"
                                rules={[{ required: true, message: 'Vui lòng nhập vị trí làm việc' }]}
                            >
                                <Select
                                    options={[
                                        { label: <span>Nhân viên lễ tân</span>, value: 'Lễ tân' },
                                        { label: <span>Nhân viên đặt phòng</span>, value: 'Đặt phòng' },
                                        { label: <span>Nhân viên thu ngân</span>, value: 'Thu ngân' },
                                        { label: <span>Nhân viên hỗ trợ khách hàng</span>, value: 'Hỗ trợ khách hàng' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className="w-full">
                            <p className="font-medium">Hồ sơ</p>
                            <Form.Item
                                name="name"
                                label="Họ và Tên"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                </ModalTable>
    
                <PageHeader title="Quản lý nhân viên" search={handleSearch} add={handleAddStaff} del={handleDeleteStaff} />
    
                <Table
                    rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                    columns={columns}
                    dataSource={dataStaffs}
                    size="middle"
                    bordered
                />
            </Spin>
        </div>
    );
};

export default Staff;
