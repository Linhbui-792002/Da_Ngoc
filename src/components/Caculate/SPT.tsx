import { Table } from "antd";
import React from "react";

const SPT = () => {
    const dataSource = [
        {
          key: "1",
          landType: "Đất lấp",
          m: "0.7",
          liN: "_",
        },
        {
          key: "2",
          landType: "Đất sét pha, dẻo mềm N = 7 kN/m²",
          m: "1.7",
          liN: "11.9",
        },
        {
          key: "3",
          landType: "Đất cát pha, dẻo mềm  N = 8 kN/m²",
          m: "1.5",
          liN: "12",
        },
        {
          key: "4",
          landType: "Đất sét pha, dẻo cứng N = 12 kN/m²",
          m: "6",
          liN: "72",
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
          title: "li*N",
          dataIndex: "liN",
          key: "liN",
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
              Tổng (li*N): <span>144.2</span>
            </span>
          </div>
        </div>
      );
    };
    


export default SPT;
