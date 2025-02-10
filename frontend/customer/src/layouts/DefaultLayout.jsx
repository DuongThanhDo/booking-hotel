import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='min-h-[80vh]'>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
