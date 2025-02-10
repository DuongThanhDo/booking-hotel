import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { TbBrandBooking } from 'react-icons/tb';
import { BiBarChartSquare, BiBed, BiGroup, BiHeadphone, BiUserCircle } from 'react-icons/bi';

import { configs } from '../../configs';

export const sideBar = [
    { title: 'Trang chủ', icon: <IoHomeOutline className="w-[20px] h-[20px]" />, to: configs.routes.home },
    { title: 'Đặt phòng', icon: <TbBrandBooking className="w-[20px] h-[20px]" />, to: configs.routes.booking },
    { title: 'Phòng', icon: <BiBed className="w-[20px] h-[20px]" />, to: configs.routes.room, role: 'admin' },
    {
        title: 'Khách hàng',
        icon: <BiUserCircle className="w-[20px] h-[20px]" />,
        to: configs.routes.customer,
        role: 'admin',
    },
    { title: 'Nhân sự', icon: <BiGroup className="w-[20px] h-[20px]" />, to: configs.routes.staff, role: 'admin' },
    {
        title: 'Thống kê',
        icon: <BiBarChartSquare className="w-[20px] h-[20px]" />,
        to: configs.routes.statistical,
        role: 'admin',
    },
    { title: 'Hỗ trợ', icon: <BiHeadphone className="w-[20px] h-[20px]" />, to: configs.routes.support },
    // { title: 'Cài đặt', icon: <IoSettingsOutline className="w-[20px] h-[20px]" />, to: configs.routes.setting },
];
