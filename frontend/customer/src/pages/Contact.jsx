import React from 'react';
import { assets } from '../assets';
import PageFrame from '../components/common/PageFrame';
import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Iframe from '../components/Iframe';

function Contact() {
    return (
        <div>
            <PageFrame img={assets.images.contact} name={'Liên hệ'}>
                <div>
                    <div className="flex gap-[30px]">
                        <div>
                            <p className="py-4 text-[24px] text-[#2389C9]">Thông tin của liên hệ</p>
                            <p className="text-[#2389C9] font-black mb-3">_____</p>
                            <p>02 Lê Lợi, Thành phố Huế, Huế, Việt Nam</p>
                            <p className="my-4">Email: Hoteldtd@gmail.com</p>
                            <p>Gọi: 0902207049</p>
                        </div>
                        <div className="flex-1">
                            <p className="py-4 text-[24px] text-[#2389C9]">Để lại lời nhắn</p>
                            <p className="text-[#2389C9] font-black mb-3">_____</p>
                            <div>
                                <Input placeholder="Tiêu đề..." />
                                <Input className="my-3" placeholder="Họ và tên..." />
                                <Input placeholder="Email..." />
                                <TextArea className="my-3" rows={4} placeholder="Nội dung" />
                                <Button className="float-end">Gửi đi</Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-[40px]">
                        <Iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.3339775811637!2d107.57920918312512!3d16.458618144157356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a149f1264005%3A0x87180a1a3b4ed8d8!2zMiBMw6ogTOG7o2ksIFbEqW5oIE5pbmgsIFRow6BuaCBwaOG7kSBIdeG6vywgVGjhu6thIFRoacOqbiBIdeG6vywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1721465166032!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            style={{ border: '0' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </PageFrame>
        </div>
    );
}

export default Contact;
