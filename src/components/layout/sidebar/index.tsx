import React, { useEffect, useState } from 'react';
import {
    CalendarOutlined,
    AreaChartOutlined,
    ContainerOutlined,
    CheckSquareOutlined,
    UserOutlined,
    SolutionOutlined,
    CommentOutlined,
} from '@ant-design/icons';


import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getWindowDimensions } from '@src/common/lib/getWindowDimensions';
import { cn } from '@src/common/lib/utils';


const Sidebar = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(router.pathname);
    useEffect(() => {
        setCurrent(router.pathname);
    }, [router.pathname]);

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowDimensions.width && windowDimensions.width <= 960) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [windowDimensions]);

    return (
        <div style={{ height: 'calc(100vh - 55px)'}} className={cn('shadow-sm bg-b-white px-2 py-1 overflow-scroll', !collapsed ? 'w-60' : '')}>
           {
             new Array(20).fill(null).map((_,index)=>
               (
                <div key={index} className="my-2 p-2 cursor-pointer rounded-md bg-b-primary hover:bg-b-gray">
                <span className="text-md">Bản ghi 1</span>
                <span className="block text-sm">07/04/2024</span>
           </div>
               )
            )
           }

        </div>
    );
};

export default Sidebar;
