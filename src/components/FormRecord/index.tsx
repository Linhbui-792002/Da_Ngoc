import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Input, Spin, Radio } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation } from "@src/common/hooks/useMutation";
import { toast } from "react-toastify";
import { useQuery } from "@src/common/hooks/useQuery";
import { useRouter } from "next/router";

const RecordForm = ({
  recordId,
  successCallback,
  label,
  title,
  type = "create",
}: any) => {
  const formRef = useRef<any>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: getLoading,
    data: recordData,
    reload,
  } = useQuery(`record/${recordId}`, { recordId, isModalOpen });

  const [trigger, { isLoading, data, error }] = useMutation();

  useEffect(() => {
    if (isModalOpen) {
      reload();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({ ...recordData });
    }
  }, [recordData, getLoading]);

  useEffect(() => {
    if (error) {
      toast.error("Lỗi chỉnh sửa bản ghi!");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(
        recordId ? "Chỉnh sửa bản ghi thành công" : "Tạo bản ghi thành công"
      );
      if (type == "update") {
        router.replace(`${recordId}/tinh-toan`);
      } else {
        router.replace(`/${data._id}`);
      }
      setIsModalOpen(false);
      setTimeout(() => {
        successCallback?.();
      });
    }
  }, [data]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    formRef.current?.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (recordId) {
      trigger("PATCH", `/record`, { ...values, _id: recordData._id });
    } else {
      trigger("POST", "record", values);
    }
  };

  return (
    <>
      {type == "create" ? (
        <Button
          icon={recordId ? <EditOutlined /> : <PlusOutlined />}
          onClick={showModal}
          shape={recordId ? "circle" : "default"}
        >
          {label}
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={showModal}
          className="!bg-b-success text-white hover:!bg-b-success-opcity"
        >
          {label}
        </Button>
      )}

      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={!recordId ? "Thêm mới" : "Lưu"}
        cancelText="Hủy"
        okButtonProps={{ loading: isLoading || getLoading }}
        cancelButtonProps={{ disabled: isLoading || getLoading }}
        centered
      >
        <Spin spinning={getLoading}>
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={onFinish}
            autoComplete="off"
            disabled={isLoading}
            form={form}
          >
            {type == "create" ? (
              <Form.Item
                label="Tên bản ghi"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Nhập tên bản ghi!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : (
              <Form.Item
                label="Nhập Li"
                name="li"
                rules={[
                  {
                    required: true,
                    message: "Nhập li!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item hidden>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default RecordForm;
