import { useQuery } from "@src/common/hooks/useQuery";
import { Spin, Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Statistical = () => {
  const router = useRouter();
  const recordId = router.query.recordId;

  const {
    data: dataSource,
    reload,
    isLoading: dataSourceLoading,
  } = useQuery(`caculate/pptk/${recordId}`);

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
        if (index > 0 && dataSource?.statistical[index - 1].key === value) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource?.statistical.filter(
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
        if (
          index > 0 &&
          dataSource?.statistical[index - 1].landType === value
        ) {
          obj.props.rowSpan = 0;
        } else {
          const count = dataSource?.statistical.filter(
            (item: any) => item.landType === value
          ).length;
          obj.props.rowSpan = count;
        }
        return obj;
      },
    },
    {
      title: "tau (li)",
      dataIndex: "li",
      key: "li",
    },
    {
      title: "Độ sâu trung bình",
      dataIndex: "avgDepth",
      key: "avgDepth",
    },
    {
      title: "τi kN/m²",
      dataIndex: "tau",
      key: "tau",
    },
    {
      title: "liτi",
      dataIndex: "liti",
      key: "liti",
    },
    {
      title: "P ma sát",
      dataIndex: "Pms",
      key: "Pm",
    },
  ];

  return (
    <Spin spinning={dataSourceLoading}>
      <Table
        dataSource={dataSource?.statistical}
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

export default Statistical;
