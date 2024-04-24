import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { AlertButton } from "@src/common/components/alert-button";
import {
  SANDLAND_NAME,
  SANDLAND_STATUS,
  SOIL_NAME,
  SOIL_STATUS,
} from "@src/common/Constant/constant";
import { useMutation } from "@src/common/hooks/useMutation";
import { useQuery } from "@src/common/hooks/useQuery";
import {
  Button,
  Form,
  Input,
  Modal,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const DeleteSoilLayer = ({ id, successCallback }: any) => {
  const [trigger, { isLoading, data, error }] = useMutation();
  useEffect(() => {
    if (data) {
      toast.success("Xóa bản ghi thành công!");
      setTimeout(() => {
        successCallback?.();
     });
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error("Lỗi xóa bản ghi!");
    }
  }, [error]);


  const handleDeleteSoilLayer = () => {
    trigger("DELETE", `soilLayer/${id}`);
  };
  return (
    <Tooltip title="Xóa bản ghi" color="red">
      <AlertButton
        modalTitle={"Xóa bản ghi"}
        icon={<DeleteOutlined />}
        shape="circle"
        danger
        message="Bạn có muốn xóa bàn ghi này không ?"
        onConfirm={handleDeleteSoilLayer}
      />
    </Tooltip>
  );
};

const SoilLayer = () => {
  const router = useRouter();
  const recordId = router.query.recordId;
  const [soilType, setSoilType] = useState<boolean>(true);
  const [soilLayerId, setSoilLayerId] = useState<any>();
  const formRef = useRef<any>(null);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: listSoilLayer,
    reload,
    isLoading: listSoilLayerLoading,
  } = useQuery(`soilLayer/soilLayerRecord/${recordId}`);

  const {
    isLoading: soilLayerLoading,
    data: soilLayerData,
    reload: soilLayerReload,
  } = useQuery(`soilLayer/${soilLayerId}`, { soilLayerId, isModalOpen });

  const [trigger, { isLoading, data, error }] = useMutation();

  useEffect(() => {
    if (!soilType) {
      form.setFieldsValue({ B: 0, C: 0 });
    }
  }, [soilType]);

  useEffect(() => {
    if (!soilLayerId) {
      setSoilType(true);
      form.setFieldsValue({ soilType: "Đất sét" });
    } else {
      const soilTypeValue = soilLayerData?.soilType || "Đất sét";
      setSoilType(soilTypeValue === "Đất sét");
    }
  }, [isModalOpen, soilLayerId, soilLayerData]);

  useEffect(() => {
    if (error) {
      toast.error(soilLayerId ? "Lỗi chỉnh sửa lớp đất!" : "Lỗi thêm lớp đất!");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(
        soilLayerId ? "Chỉnh sửa lớp đất thành công" : "Tạo lớp đất thành công"
      );
      handleCancel();
      setTimeout(() => {
        reload();
      });
    }
  }, [data]);

  useEffect(() => {
    if (soilLayerData && soilLayerId) {
      form.setFieldsValue({ ...soilLayerData });
    }
  }, [soilLayerData, soilLayerLoading, soilLayerId]);

  const showModal = () => {
    form.resetFields();
    soilLayerReload();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setSoilLayerId(undefined);
    setIsModalOpen(false);
    soilLayerReload();
  };

  const onFinish = (values: any) => {
    const soilTypeValue = form.getFieldValue("soilType") || "Đất sét";
    const soilType = soilTypeValue === "Đất sét" ? "Đất sét" : "Đất cát";
    if (soilLayerId) {
      trigger("PATCH", `/soilLayer`, { ...values, _id: soilLayerId, soilType });
    } else {
      trigger("POST", "soilLayer", {
        ...values,
        record: recordId,
        soilType,
      });
    }
  };

  const columns = [
    {
      title: "Lớp đất",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Tên đất",
      dataIndex: "soilName",
      key: "soilName",
    },
    {
      title: "Trạng thái",
      dataIndex: "soilStatus",
      key: "soilStatus",
    },
    {
      title: "Chiều dày",
      dataIndex: "L",
      key: "L",
    },
    {
      title: "Độ sệt",
      dataIndex: "B",
      key: "B",
    },
    {
      title: "Góc ma sát φ",
      dataIndex: "phi",
      key: "phi",
    },
    {
      title: "δ",
      dataIndex: "gama",
      key: "gama",
    },
    {
      title: "Qc",
      dataIndex: "Qc",
      key: "Qc",
    },
    {
      title: "N",
      dataIndex: "N",
      key: "N",
    },
    {
      title: "Eo",
      dataIndex: "Eo",
      key: "Eo",
    },
    {
      title: "C",
      dataIndex: "C",
      key: "C",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setSoilLayerId(record._id);
            }}
            shape={"circle"}
          ></Button>
          <DeleteSoilLayer id={record._id} successCallback={reload} />
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={listSoilLayerLoading}>
      <div className="mt-2">
        <span className="text-md">Nhập số liệu lớp đất:</span>
        <div className="flex justify-between">
          <div></div>
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Thêm lớp đất
          </Button>
          <Modal
            title="Nhập số liệu lớp đất"
            okText={soilLayerId ? "Chỉnh sửa" : "Thêm mới"}
            cancelText="Thoát"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width="60vw"
          >
            <Form
              layout="vertical"
              ref={formRef}
              onFinish={onFinish}
              autoComplete="off"
              // disabled={isLoading}
              form={form}
            >
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
                  <Form.Item
                    label="Chiều dày"
                    name="L"
                    rules={[
                      {
                        required: true,
                        message: "Nhập chiều dày",
                      },
                    ]}
                  >
                    <Input suffix="m" />
                  </Form.Item>
                  <Form.Item
                    label="Dung trọng lực tự nhiên δ"
                    name="gama"
                    rules={[
                      {
                        required: true,
                        message: "Nhập dung trọng lực tự nhiên",
                      },
                    ]}
                  >
                    <Input suffix="kN/m³" />
                  </Form.Item>

                  <Form.Item
                    label="Góc ma sát φ"
                    name="phi"
                    rules={[
                      {
                        required: true,
                        message: "Nhập góc ma sát",
                      },
                    ]}
                  >
                    <Input suffix="độ" />
                  </Form.Item>

                  <Form.Item
                    label="Sức kháng xuyên của cọc Qc"
                    name="Qc"
                    rules={[
                      {
                        required: true,
                        message: "Nhập sức kháng xuyên của cọc",
                      },
                    ]}
                  >
                    <Input suffix="kN/m²" />
                  </Form.Item>

                  <Form.Item
                    label="Chỉ số SPT (N)"
                    name="N"
                    rules={[
                      {
                        required: true,
                        message: "Nhập chỉ số SPT",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Module biến dạng Eo"
                    name="Eo"
                    rules={[
                      {
                        required: true,
                        message: "Nhập module biến dạng",
                      },
                    ]}
                  >
                    <Input suffix="kN/m²" />
                  </Form.Item>
                </div>
                <div className="col-span-5">
                  <Segmented<string>
                    options={["Đất sét", "Đất cát"]}
                    onChange={(value) => {
                      form.setFieldValue("soilType", value);
                      const isSetType = value === "Đất sét";
                      setSoilType(isSetType);
                      if (
                        soilLayerId &&
                        isSetType === (soilLayerData?.soilType === "Đất sét")
                      ) {
                        form.setFieldsValue({ ...soilLayerData });
                      } else {
                        form.resetFields(["B", "C", "soilName", "soilStatus"]);
                      }
                    }}
                    value={soilType ? "Đất sét" : "Đất cát"}
                  />
                  {soilType ? (
                    <>
                      <Form.Item
                        label="Tên đất"
                        name="soilName"
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên đất",
                          },
                        ]}
                      >
                        <Select>
                          {SOIL_NAME?.map((item: any) => (
                            <Select.Option key={item} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Trạng thái"
                        name="soilStatus"
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên đất",
                          },
                        ]}
                      >
                        <Select>
                          {SOIL_STATUS?.map((item: any) => (
                            <Select.Option key={item} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Độ sệt B"
                        name="B"
                        rules={[
                          {
                            required: true,
                            message: "Nhập độ sệt B",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Lực dính đơn vị C"
                        name="C"
                        rules={[
                          {
                            required: true,
                            message: "Nhập lực dính đơn vị",
                          },
                        ]}
                      >
                        <Input suffix="kN/m²" />
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      <Form.Item
                        label="Tên đất"
                        name="soilName"
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên đất",
                          },
                        ]}
                      >
                        <Select>
                          {SANDLAND_NAME?.map((item: any) => (
                            <Select.Option key={item} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Trạng thái"
                        name="soilStatus"
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên đất",
                          },
                        ]}
                      >
                        <Select>
                          {SANDLAND_STATUS?.map((item: any) => (
                            <Select.Option key={item} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Độ sệt B"
                        name="B"
                        rules={[
                          {
                            required: true,
                            message: "Nhập độ sệt B",
                          },
                        ]}
                        initialValue={0}
                      >
                        <Input value="0" defaultValue="0" disabled />
                      </Form.Item>
                      <Form.Item
                        label="Lực dính đơn vị C"
                        name="C"
                        rules={[
                          {
                            required: true,
                            message: "Nhập lực dính đơn vị",
                          },
                        ]}
                        initialValue={0}
                      >
                        <Input
                          suffix="kN/m²"
                          value="0"
                          defaultValue="0"
                          disabled
                        />
                      </Form.Item>
                    </>
                  )}
                </div>
              </div>
              <Form.Item hidden>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="w-full flex flex-col text-center">
          <span className="mx-auto text-md mb-3">Bảng Số Liệu Lớp Đất</span>
          <Table
            pagination={{ pageSize: 5 }}
            dataSource={listSoilLayer}
            columns={columns}
          />
        </div>
      </div>
    </Spin>
  );
};

export default SoilLayer;
