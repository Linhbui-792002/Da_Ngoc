import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Statistical from "./statistical";
import CPT from "./CPT";
import SPT from "./SPT";
import Diagram from "./Diagram";
const Caculate = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Theo Phương Pháp Thống Kê",
      children: <Statistical />,
    },
    {
      key: "2",
      label: "Theo Phương Pháp CPT",
      children: <CPT/>,
    },
    {
      key: "3",
      label: "Phương Pháp SPT",
      children: <SPT/>,
    },
    {
        key: "4",
        label: "Đồ thị",
        children: <Diagram/>,
      },
  ];
  return (
    <div className="container">
      <div className="mt-4 text-xl">Kết quả tính toán sức chịu tải</div>
      <Tabs defaultActiveKey="1" type="card" size="middle" items={items} />
    </div>
  );
};

export default Caculate;
