import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { SANDLAND_NAME, SANDLAND_STATUS, SOIL_NAME, SOIL_STATUS } from '@src/common/Constant/constant';
import { Button, Form, Input, Modal, Segmented, Select, Space, Table } from 'antd'
import React, { useRef, useState } from 'react'

const SoilLayer = () => {
    const [soilType, setSoilType] = useState<boolean>(false)
    const formRef = useRef<any>(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOk = () => {
        formRef.current.submit();
        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = (values:any) => {
       console.log(values,'values')
    };

    const data = [
        {
            key: 1,
            B: "12",
            C: "3",
            Eo: "12",
            SPT: "12",
            frictionAngle: "34",
            gravity: "2",
            resistance: "2",
            soilName: "Đất Sét",
            soilStatus: "Dẻo Cứng",
            thickness: "12"
        },
        {
            key: 2,
            B: "12",
            C: "3",
            Eo: "12",
            SPT: "12",
            frictionAngle: "34",
            gravity: "2",
            resistance: "2",
            soilName: "Đất Sét",
            soilStatus: "Dẻo Cứng",
            thickness: "12"
        },
        {
            key: 3,
            B: "12",
            C: "3",
            Eo: "12",
            SPT: "12",
            frictionAngle: "34",
            gravity: "2",
            resistance: "2",
            soilName: "Đất Sét",
            soilStatus: "Dẻo Cứng",
            thickness: "12"
        },
        {
            key: 4,
            B: "12",
            C: "3",
            Eo: "12",
            SPT: "12",
            frictionAngle: "34",
            gravity: "2",
            resistance: "2",
            soilName: "Đất Sét",
            soilStatus: "Dẻo Cứng",
            thickness: "12"
        },
        {
            key: 5,
            B: "12",
            C: "3",
            Eo: "12",
            SPT: "12",
            frictionAngle: "34",
            gravity: "2",
            resistance: "2",
            soilName: "Đất Sét",
            soilStatus: "Dẻo Cứng",
            thickness: "12"
        }
    ];
    
      

    const columns = [
        {
            title: 'Lớp đất',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên đất',
            dataIndex: 'soilName',
            key: 'soilName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'soilStatus',
            key: 'soilStatus',
        },
        {
            title: 'Chiều dày',
            dataIndex: 'thickness',
            key: 'thickness',
        },
        {
            title: 'Độ sệt',
            dataIndex: 'B',
            key: 'B',
        },
        {
            title: 'Góc ma sát φ',
            dataIndex: 'frictionAngle',
            key: 'frictionAngle',
        },
        {
            title: 'δ',
            dataIndex: 'gravity',
            key: 'gravity',
        },
        {
            title: 'Qc',
            dataIndex: 'resistance',
            key: 'resistance',
        },
        {
            title: 'N',
            dataIndex: 'SPT',
            key: 'SPT',
        },
        {
            title: 'Eo',
            dataIndex: 'Eo',
            key: 'Eo',
        },
        {
            title: 'C',
            dataIndex: 'C',
            key: 'C',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_:any, record:any) => (
                <Space size="middle">
                    <Button
                type="primary"
                icon={ <EditOutlined /> }
                onClick={showModal}
                shape={ 'circle'}
            >
               
            </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <span className="text-md">Nhập số liệu lớp đất:</span>
            <div className="flex justify-between">
                <div></div>
                <Button type="primary" onClick={showModal} icon={ <PlusOutlined /> }>Thêm lớp đất</Button>
                <Modal
                    title="Nhập số liệu lớp đất"
                    okText="Thêm mới"
                    cancelText="Thoát"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width='60vw'
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
                                    name="thickness"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập chiều dày',
                                        },
                                    ]}

                                >
                                    <Input suffix="m" />
                                </Form.Item>
                                <Form.Item
                                    label="Dung trọng lực tự nhiên δ"
                                    name="gravity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập dung trọng lực tự nhiên',
                                        },
                                    ]}

                                >
                                    <Input suffix="kN/m³" />
                                </Form.Item>

                                <Form.Item
                                    label="Góc ma sát φ"
                                    name="frictionAngle"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập góc ma sát',
                                        },
                                    ]}

                                >
                                    <Input suffix="độ" />
                                </Form.Item>

                                <Form.Item
                                    label="Sức kháng xuyên của cọc Qc"
                                    name="resistance"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập sức kháng xuyên của cọc',
                                        },
                                    ]}

                                >
                                    <Input suffix="kN/m²" />
                                </Form.Item>

                                <Form.Item
                                    label="Chỉ số SPT (N)"
                                    name="SPT"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập chỉ số SPT',
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
                                            message: 'Nhập module biến dạng',
                                        },
                                    ]}

                                >
                                    <Input suffix="kN/m²" />
                                </Form.Item>
                            </div>
                            <div className="col-span-5">
                                <Segmented<string>
                                    options={['Đất sét', 'Đất cát']}
                                    onChange={(value) => {
                                        setSoilType(value == 'Đất sét' ? true : false)
                                        form.resetFields(['B','C','soilName','soilStatus']);
                                        console.log(value);
                                    }}
                                />
                                {soilType
                                    ? <>
                                        <Form.Item
                                            label="Tên đất"
                                            name="soilName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nhập tên đất',
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
                                                    message: 'Nhập tên đất',
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
                                                    message: 'Nhập độ sệt B',
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
                                                    message: 'Nhập lực dính đơn vị',
                                                },
                                            ]}

                                        >
                                            <Input suffix="kN/m²" />
                                        </Form.Item>
                                    </>
                                    : <>
                                     <Form.Item
                                            label="Tên đất"
                                            name="soilName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nhập tên đất',
                                                },
                                            ]}

                                        >
                                            <Select >
                                                {SANDLAND_NAME?.map((item: any) => (
                                                    <Select.Option key={item} value={item} >
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
                                                    message: 'Nhập tên đất',
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
                                                    message: 'Nhập độ sệt B',
                                                },
                                            ]}
                                            initialValue={0}
                                        >
                                            <Input defaultValue='0' disabled/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Lực dính đơn vị C"
                                            name="C"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nhập lực dính đơn vị',
                                                },
                                            ]}
                                            initialValue={0}
                                        >
                                            <Input suffix="kN/m²" defaultValue='0' disabled />
                                        </Form.Item>
                                    </>}
                            </div>
                        </div>
                        <Form.Item
                         hidden
                         >
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
                    dataSource={data}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default SoilLayer