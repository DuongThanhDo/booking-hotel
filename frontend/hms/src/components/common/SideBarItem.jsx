import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBarItem({ sideBarItem }) {
    return (
        <NavLink
            className={(nav) =>
                `flex mx-[22px] my-2 rounded-lg px-[18px] py-[6px] hover:bg-[#D5E6FB] hover:text-blue-600 text-[16px] font-semibold transition-all ${
                    nav.isActive ? 'text-blue-600 bg-[#D5E6FB]' : ''
                }`
            }
            to={sideBarItem.to}
        >
            {sideBarItem.icon}
            <p className="ml-3">{sideBarItem.title}</p>
        </NavLink>
    );
}

export default SideBarItem;
