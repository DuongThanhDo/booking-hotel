import React from 'react';
import { Button, Input } from 'antd';

const { Search } = Input;

function PageHeader({ title, search, add, del, no = false, configs }) {
    return (
        <div className="w-full flex justify-between items-center mb-8">
            <p className="text-[24px] font-semibold">
                <i>{title}</i>
            </p>
            <div className="w-[30%]">
                <Search placeholder="Tìm kiếm..." onSearch={search} />
            </div>
            <div>
                {configs}
                {!no && (
                    <>
                        <Button className="mr-8" onClick={add}>
                            Thêm
                        </Button>
                        <Button danger onClick={del}>
                            Xóa
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PageHeader;
