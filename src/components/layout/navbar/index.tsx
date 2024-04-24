import RecordForm from '@src/components/FormRecord';
import { Button } from 'antd';
import React from 'react';


const Navbar = () => {

    return (
        <nav className="flex h-14 w-full items-center justify-between border-b bg-white px-4 shadow-sm">
            <p className="text-xl font-semibold">Tính toán sct cọc</p>
            <div>
            <RecordForm label="Bản ghi mới" title="Tạo bản ghi mới"/>
            </div>
        </nav>
    );
};

export default Navbar;
