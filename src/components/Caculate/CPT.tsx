import { Table } from "antd";
import React from "react";

const CPT = () => {
  const dataSource = [
    {
      key: "1",
      landType: "Đất lấp",
      m: "0.7",
      a: "_",
      ti: "-",
      liti: "-",
    },
    {
      key: "2",
      landType: "Đất sét pha, dẻo mềm qc = 1340 kN/m²",
      m: "0.7",
      a: "30",
      ti: "30",
      liti: "31",
    },
    {
      key: "3",
      landType: "Đất cát pha, dẻo mềm qc = 1380 kN/m²",
      m: "1.5",
      a: "30",
      ti: "30",
      liti: "45",
    },
    {
      key: "4",
      landType: "Đất sét pha, dẻo cứng qc = 1730 kN/m²",
      m: "6",
      a: "30",
      ti: "30",
      liti: "180",
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
      title: "αi",
      dataIndex: "a",
      key: "a",
    },
    {
      title: "τi = (qi/αi) kN/m²",
      dataIndex: "ti",
      key: "ti",
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

export default CPT;
