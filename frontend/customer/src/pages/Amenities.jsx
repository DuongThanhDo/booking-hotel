import React from 'react';
import PageFrame from '../components/common/PageFrame';
import { assets } from '../assets';
import { cols } from '../databases';

function Amenities() {
    console.log(cols);

    return (
        <div>
            <PageFrame img={assets.images.amenities} name={'Tiện nghi'}>
                <div className="grid grid-cols-4 gap-8">
                    {cols.map((colNumber) => (
                        <div>
                            {colNumber.map((col, index) => (
                                <div key={index} className="flex-col">
                                    <p className='font-semibold mb-1 mt-4'>{col.title}</p>
                                    {col.info.map((colInfo, index2) => (
                                        <div key={index2} className="flex gap-2 items-start text-[14px] my-1 text-gray-700">
                                            <p>{colInfo.icon}</p>
                                            <p>{colInfo.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </PageFrame>
        </div>
    );
}

export default Amenities;
