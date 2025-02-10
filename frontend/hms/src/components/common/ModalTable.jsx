import React from 'react';
import { Form, Modal } from 'antd';

function ModalTable({ form, open, setOpen, handleSave, title, children, width, ...props }) {
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Modal
                title={title}
                open={open}
                onOk={handleSave}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
                width={width}
            >
                <Form form={form} layout="horizontal">
                    {children}
                </Form>
            </Modal>
        </>
    );
}

export default ModalTable;
