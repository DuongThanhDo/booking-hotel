import React from 'react';
import SideBarItem from './SideBarItem';
import { sideBar } from '../../databases/fontend-page';
import { useSelector } from 'react-redux';

function SideBar() {
    const authState = useSelector((state) => state.auth);
    return (
        <div className="w-[240px] h-[100vh] pt-2">
            {sideBar.map((item, index) => {
                if (item.role) {
                    if (item.role === authState.role) {
                        return <SideBarItem sideBarItem={item} key={index} />;
                    }
                    return null;
                } else {
                    return <SideBarItem sideBarItem={item} key={index} />;
                }
            })}
        </div>
    );
}

export default SideBar;
