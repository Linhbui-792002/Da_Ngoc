import { PILE_CONCRETE, STELL_PILE } from "@src/common/Constant/constant";
import { useMutation } from "@src/common/hooks/useMutation";
import { useQuery } from "@src/common/hooks/useQuery";
import { Button, Form, Input, Select, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const PileForm = () => {
  const router = useRouter();
  const recordId = router.query.recordId;
  const formRef = useRef<any>(null);

  const [form] = Form.useForm();
  const [rb, setRb] = useState<any>("");
  const [rbt, setRbt] = useState<any>("");
  const [rs, setRs] = useState<any>("");
  const [rsc, setRsc] = useState<any>("");
  const [rsw, setRsw] = useState<any>("");
  const [e, setE] = useState<any>("");

  const [cdtt, setCdtt] = useState("");

  const {
    isLoading: getLoading,
    data: pileData,
    reload,
  } = useQuery(`pile/${recordId}`, { recordId });

  const [trigger, { isLoading, data, error }] = useMutation();

  useEffect(() => {
    if (pileData) {
      handleSetPileConcrete(pileData.B);
      handleSetPileStell(pileData.CB);
      form.setFieldsValue({ ...pileData });
    }
  }, [pileData]);

  useEffect(() => {
    form.resetFields();
    reload();
    setRb(null);
    setRbt(null);
    setRs(null);
    setRsc(null);
    setRsw(null);
    setE(null);
  }, [recordId]);

  useEffect(() => {
    if (error) {
      toast.error("Lỗi lưu dữ liệu cọc!");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success("Lưu dữ liệu cọc thành công");
      setTimeout(() => {
        reload();
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    if (pileData && pileData._id) {
      await trigger("POST", `/pile`, {
        ...values,
        _id: pileData._id,
        record: recordId,
      });
    } else {
      await trigger("POST", `/pile`, { ...values, record: recordId });
    }
    form.resetFields();
  };

  const handleSetPileConcrete = (value: any) => {
    const data = PILE_CONCRETE.find((item: any) => item.title === value);

    if (data) {
      form.setFieldsValue({
        Rb: data.data.Rb,
        Rbt: data.data.Rbt,
      });
      setRb(data.data.Rb);
      setRbt(data.data.Rbt);
    }
  };

  const a = Form.useWatch("a", form);
  const B = Form.useWatch("B", form);
  const CB = Form.useWatch("CB", form);
  const n = Form.useWatch("n", form);
  const r = Form.useWatch("r", form);

  useEffect(() => {
    handleSetPvl();
  }, [a, B, CB, n, r]);

  const handleSetPvl = () => {
    const m = 1 as number;
    const phi = 0.9 as number;
    const a = form.getFieldValue("a") as number;
    const n = form.getFieldValue("n") as number;
    const piloR = form.getFieldValue("r") as number;
    const Ra = (rs * 10 * 10 * 10) as number;
    const Fa = ((n * 3.14 * piloR * piloR) / 4) as number;
    const Fb = (a * a - Fa) as number;

    const Pvl = parseFloat(
      (m * phi * (rb * 10 * 10 * 10 * Fb + Ra * Fa)).toFixed(3)
    );

    form.setFieldsValue({
      Pvl: Pvl ? Pvl.toFixed(3) : 0,
    });
  };
  const handlePileLengthChange = (event: any) => {
    const pileLengthValue = event.target.value;
    form.setFieldValue("cdtt", 0);
    if (pileLengthValue) {
      const calculatedValue = parseFloat(pileLengthValue) - 0.5;
      setCdtt(calculatedValue.toFixed(2));
      form.setFieldValue("cdtt", calculatedValue.toFixed(2));
    }
  };

  const handleSetPileStell = (value: any) => {
    const data = STELL_PILE.find((item: any) => item.title === value);

    if (data) {
      form.setFieldsValue({
        Rs: data.data.Rs,
        Rsc: data.data.Rsc,
        Rsw: data.data.Rsw,
        E: data.data.E,
      });
      setRs(data.data.Rs);
      setRsc(data.data.Rsc);
      setRsw(data.data.Rsw);
      setE(data.data.E);
    }
  };
  return (
    <Spin spinning={getLoading}>
      <div className="mt-2">
        <span className="text-md">Nhập số liệu cọc:</span>
        <Form
          layout="vertical"
          ref={formRef}
          onFinish={onFinish}
          autoComplete="off"
          // disabled={isLoading}
          form={form}
        >
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-5">
              <Form.Item
                label="Tiết diện cọc a"
                name="a"
                rules={[
                  {
                    required: true,
                    message: "Nhập tiết diện cọc",
                  },
                ]}
              >
                <Input suffix="m" />
              </Form.Item>
              <div className="grid grid-cols-12 gap-4">
                <Form.Item
                  label="Bê tông cọc"
                  name="B"
                  rules={[
                    {
                      required: true,
                      message: "Nhập bê tông cọc",
                    },
                  ]}
                  className="col-span-3"
                >
                  <Select onChange={handleSetPileConcrete}>
                    {PILE_CONCRETE?.map((item: any) => (
                      <Select.Option key={item.title} value={item.title as any}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="col-span-6">
                  <span className="font-medium mx-4">Rb: {rb ? rb : "_"}</span>
                  <span className="font-medium mx-4 block">
                    Rbt: {rbt ? rbt : "_"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <Form.Item
                  label="Thép cọc"
                  name="CB"
                  rules={[
                    {
                      required: true,
                      message: "Nhập thép cọc",
                    },
                  ]}
                  className="col-span-3"
                >
                  <Select onChange={handleSetPileStell}>
                    {STELL_PILE?.map((item: any) => (
                      <Select.Option key={item.title} value={item.title}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="col-span-6">
                  <span className="font-medium mx-4">Rs: {rs ? rs : "_"}</span>
                  <span className="font-medium mx-4 block">
                    Rsc: {rsc ? rsc : "_"}
                  </span>
                  <span className="font-medium mx-4 block">
                    Rsw: {rsw ? rsw : "_"}
                  </span>
                  <span className="font-medium mx-4 block">
                    E: {e ? e : "_"}
                  </span>
                </div>
              </div>

              <Form.Item
                label="Nhập thép cọc n"
                name="n"
                rules={[
                  {
                    required: true,
                    message: "Nhập thép cọc",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Đường kính thép cọc"
                name="r"
                rules={[
                  {
                    required: true,
                    message: "Nhập đường kính thép cọc",
                  },
                ]}
              >
                <Input suffix="m" />
              </Form.Item>
            </div>
            <div className="col-span-5">
              <Form.Item
                label="Chiều sâu chân móng hm"
                name="hm"
                rules={[
                  {
                    required: true,
                    message: "Nhập chiều sâu chân móng hm",
                  },
                ]}
              >
                <Input suffix="m" />
              </Form.Item>

              <Form.Item
                label="Chiều dài cọc"
                name="cdc"
                rules={[
                  {
                    required: true,
                    message: "Nhập chiều dài cọc L",
                  },
                ]}
              >
                <Input suffix="m" onChange={handlePileLengthChange} />
              </Form.Item>

              <Form.Item
                label="Chiều dài tính toán"
                name="cdtt"
                // initialValue={cdtt}
              >
                <Input suffix="m" disabled />
              </Form.Item>

              <Form.Item label="Pvl" name="Pvl">
                <Input suffix="m" disabled />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default PileForm;
