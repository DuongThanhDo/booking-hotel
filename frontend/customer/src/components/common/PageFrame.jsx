import React from 'react';

function PageFrame({ img, name, children }) {
    return (
        <>
            <div className="relative">
                <div className="w-full h-[80vh]">
                    <img className="w-full h-full object-cover object-center top-0 fixed -z-10" src={img} alt={name} />
                </div>

                <p className="text-[40px] font-medium text-[#2389C9] absolute bottom-[80px] left-[15%] bg-white pb-[10px] pl-[20px] pt-[60px] pr-[10%]">
                    {name}
                </p>
            </div>
            <div className="bg-[#F4F4F4] px-[15%]">
                <div className="w-full h-full bg-white relative top-[-60px] z-10 p-10">
                    <div>{children}</div>

                    <div className="absolute bottom-[-60px] bg-white h-[60px] right-0 w-full"></div>
                </div>
            </div>
        </>
    );
}

export default PageFrame;
