import React, { useCallback, useEffect, useState } from 'react';
import { message, Spin, Table } from 'antd';
import { IoEyeOutline } from 'react-icons/io5';
import PageHeader from '../components/common/PageHeader';
import customerApi from '../features/apis/customerApi';

function Customer() {
    const [dataCustomers, setDataCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomer = useCallback(async () => {
        setLoading(true);
        try {
            const response = await customerApi.getCustomer();
            console.log(response);
            setDataCustomers(
                response.map((customer) => ({
                    ...customer,
                    name: customer.profile.name,
                    phone: customer.profile.phone,
                    address: customer.profile.address,
                    dob: customer.customer.dob,
                })),
            );
        } catch (error) {
            message.error('Lỗi không thể lấy danh sách khách hàng!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomer();
    }, [fetchCustomer]);

    const handleSearch = () => {};

    const columns = [
        { title: 'Họ và Tên', dataIndex: 'name', key: 'name' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
        { title: 'Tên người dùng', dataIndex: 'user_name', key: 'user_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: '#',
            key: 'action',
            render: (_, record) => <IoEyeOutline className="cursor-pointer text-[20px]" />,
        },
    ];
    return (
        <div className="m-4">
            <Spin spinning={loading}>
                <PageHeader title="Quản lý khách hàng" search={handleSearch} no />
                <Table columns={columns} dataSource={dataCustomers} size="middle" bordered />
            </Spin>
        </div>
    );
}

export default Customer;
