import { useQuery } from "@src/common/hooks/useQuery";
import { Spin, Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SPT = () => {
  const router = useRouter();
  const recordId = router.query.recordId;

  const {
    data: dataSource,
    reload,
    isLoading: dataSourceLoading,
  } = useQuery(`caculate/spt/${recordId}`);

  useEffect(() => {
    reload();
  }, [recordId]);

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
        if (index > 0 && dataSource?.DataSPT[index - 1].key === value) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource?.DataSPT.filter(
            (item: any) => item.key === value
          ).length;
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
        if (index > 0 && dataSource?.DataSPT[index - 1].landType === value) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource?.DataSPT.filter(
            (item: any) => item.landType === value
          ).length;
          obj.props.rowSpan = count;
        }
        return obj;
      },
    },
    {
      title: "li (m)",
      dataIndex: "li",
      key: "li",
    },
    {
      title: "li*N",
      dataIndex: "liN",
      key: "liN",
    },
    {
      title: "P ma sát",
      dataIndex: "Pms",
      key: "Pms",
    },
  ];

  return (
    <Spin spinning={dataSourceLoading}>
      <Table
        dataSource={dataSource?.DataSPT}
        columns={columns}
        pagination={false}
        bordered
      />
      <div>
        <span className="text-md font-medium mt-4 block">
          Tổng P ma sát (kN): <span>{dataSource?.totalPms}</span>
        </span>
        <span className="text-md font-medium mt-4 block">
          Pmũi (kN): <span>{dataSource?.Pmui}</span>
        </span>
        <span className="text-md font-medium mt-4 block">
          Pgh (kN): <span>{dataSource?.Pgh}</span>
        </span>
      </div>
    </Spin>
  );
};

export default SPT;
