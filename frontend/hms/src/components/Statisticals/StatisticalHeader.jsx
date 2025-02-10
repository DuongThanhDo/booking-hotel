import React from 'react';
import { Input } from 'antd';

function StatisticalHeader() {
    return (
        <div className="flex justify-between items-start mb-6">
            <p className="text-[24px] font-semibold ">
                <i>Thống kê doanh thu</i>
            </p>
            <div className="flex gap-4 p-4 bg-white rounded-lg shadow-xl">
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[16px] font-medium">Từ ngày</p>
                    <Input type="date" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[16px] font-medium">Đến ngày</p>
                    <Input type="date" />
                </div>
            </div>
            <div className="py-4 px-10 bg-white rounded-2xl shadow-xl text-center">
                <p className="text-[20px] font-medium text-blue-600">Tổng doanh thu</p>
                <p className="text-[24px] font-medium">
                    {'12321'}
                    <small>(vnđ)</small>
                </p>
            </div>
        </div>
    );
}

export default StatisticalHeader;
