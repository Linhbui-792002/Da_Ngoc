import { Table } from "antd";
import React from "react";

const Statistical = () => {
  const dataSource = [
    {
      key: "1",
      landType: "Đất lấp",
      m: "-",
      averageDepth: "0.7",
      li: "-",
      liti: "-",
    },
    {
      key: "2",
      landType: "Đất sét pha, dẻo mềm",
      m: "2",
      averageDepth: "1.7",
      li: "2.68",
      liti: "5.36",
    },
    {
      key: "3",
      landType: "Đất cát pha, dẻo mềm",
      m: "2",
      averageDepth: "1.5",
      li: "14.35",
      liti: "21.53",
    },
    {
      key: "4",
      landType: "Đất sét pha, dẻo cứng",
      m: "2",
      averageDepth: "5.2",
      li: "37.1",
      liti: "74.2",
    },
    {
      key: "4",
      landType: "Đất sét pha, dẻo cứng",
      m: "2",
      averageDepth: "7.2",
      li: "39.9",
      liti: "79.8",
    },
    {
      key: "4",
      landType: "Đất sét pha, dẻo cứng",
      m: "2",
      averageDepth: "9.2",
      li: "41.72",
      liti: "83.44",
    },
  ];

  const columns = [
    {
      title: "Lớp đất",
      dataIndex: "key",
      key: "key",
      render: (value: string, row: any, index: number) => {
        const obj = {
          children: value,
          props: {} as any,
        };
        if (index > 0 && dataSource[index - 1].key === value) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource.filter((item) => item.key === value).length;
          obj.props.rowSpan = count;
        }
        return obj;
      },
    },
    {
      title: "Loại đất",
      dataIndex: "landType",
      key: "landType",
      render: (value: string, row: any, index: number) => {
        const obj = {
          children: value,
          props: {} as any,
        };
        if (index > 0 && dataSource[index - 1].landType === value) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource.filter(
            (item) => item.landType === value
          ).length;
          obj.props.rowSpan = count;
        }
        return obj;
      },
    },
    {
      title: "li (m)",
      dataIndex: "m",
      key: "m",
    },
    {
      title: "Độ sâu trung bình",
      dataIndex: "averageDepth",
      key: "averageDepth",
    },
    {
      title: "τi kN/m²",
      dataIndex: "li",
      key: "li",
    },
    {
      title: "liτi",
      dataIndex: "liti",
      key: "liti",
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <div>
        <span className="text-md font-medium mt-4 block">
          Tổng (liτi): <span>373</span>
        </span>
      </div>
    </div>
  );
};

export default Statistical;
