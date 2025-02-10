import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, updatePaymentStatus } from '../features/slices/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);

    const [cartData, setCartData] = useState([]);
    const [countPayment, setCountPayment] = useState(0);

    useEffect(() => {
        setCartData(cartState.cartData);
        console.log(cartState);
        setCountPayment(cartData.filter((item) => item.paymentStatus === true).length);
    }, [cartState.cartData, cartState, cartData]);

    const handleRemoveCartItem = (index) => {
        dispatch(removeCart(index));
    };

    const handleChangeStatusPay = (index) => {
        dispatch(updatePaymentStatus({ index }));
    };

    return (
        <div className="w-[100vw] min-h-[80vh] flex gap-8 bg-[#F4F4F4] px-[15%] pt-4 relative">
            <div className="w-[66.7%] h-full">
                <p className="text-[20px] font-medium p-2 bg-white">Giỏ hàng của bạn ({cartData.length})</p>
                {cartData.map((room, index) => (
                    <div className="flex justify-between my-5 border p-4 bg-white" key={index}>
                        <div className="flex gap-3">
                            <div className="w-[200px] h-[120px] rounded-md overflow-hidden">
                                <img
                                    className="w-full h-full object-cover object-center"
                                    src={room.img}
                                    alt={room.name}
                                />
                            </div>

                            <div className="relative">
                                <p className="h-[36%] text-[16px] font-semibold ">{room.name}</p>
                                <p className="text-[14px] text-gray-600">{room.type}</p>
                                <p>{room.price} vnđ</p>
                                <Checkbox className="absolute bottom-0" onChange={() => handleChangeStatusPay(index)} />
                            </div>
                        </div>
                        <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleRemoveCartItem(index)} />
                    </div>
                ))}
            </div>
            <div className="w-[33.3%] max-h-[220px] p-4 bg-white sticky top-4">
                <p className="text-center text-[32px] font-medium mb-4">Tổng tiền giỏ hàng</p>
                <div className="flex justify-between">
                    <p>Số lượng</p>
                    <p>{countPayment}</p>
                </div>
                <div className="flex justify-between my-4">
                    <p>Thành tiền</p>
                    <p>{} vnđ</p>
                </div>
                <Button className="w-full" type="primary">
                    Thanh toán
                </Button>
            </div>
        </div>
    );
}

export default Cart;
