import React from 'react';
import { assets } from '../assets';

function Home() {
    return (
        <div className="w-full h-[96vh] overflow-hidden relative">
            <img className="w-full h-full object-cover object-center" src={assets.images.introImg} alt="home" />
        </div>
    );
}

export default Home;
