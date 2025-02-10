import React from 'react';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';

function DefaultLayout({ children }) {
    return (
        <div className="w-[100vw] overflow-hidden">
            <Header />
            <div className="flex h-[calc(100vh-60px)]">
                <SideBar />
                <div className="grow h-[100%] bg-[#eaf0f8]">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
