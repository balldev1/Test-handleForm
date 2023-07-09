'use client'

import React, { useEffect, useState } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Form, Input, Button, Select, DatePicker, Radio, Table, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPrefix, addFirstname, addLastname, addDate, addNation, addIdcard, addGender, addPhoneumber, addPassport, addSalary,
    updateUser
} from "../userReducer";
import moment from 'moment';
import '/app/i18n';
import { useTranslation, } from 'react-i18next';

const { Option } = Select;


const Handleform = ({ DataType }) => {

    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');


    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'เพศ',
            dataIndex: 'gender',
        },
        {
            title: 'หมายเลขโทรศัพท์',
            dataIndex: 'phone',
        },
        {
            title: 'สัญชาติ',
            dataIndex: 'nation',
        },
        {
            title: 'จัดการ',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>แก้ไข</Button>
                </Space>

            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: localStorage.getItem('firstname'),
            gender: localStorage.getItem('gender'),
            phone: localStorage.getItem('phonenumber'),
            nation: localStorage.getItem('nation'),
        },

    ];

    // {เปลี่ยนภาษา}
    const { t, i18n } = useTranslation();


    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };


    const onReset = () => {
        form.resetFields();
    };

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'เลือกวันที่!' }],
    };

    ;

    const [form] = Form.useForm();

    // {dispatch}
    const formData = useSelector((state) => state.users);
    const dispatch = useDispatch();
    console.log(formData)

    // {add}
    const onFinish = (values) => {
        const formattedDate = moment(values.date).format('DD,MM,YYYY');


        dispatch(addPrefix(values.prefix));
        dispatch(addFirstname(values.firstname));
        dispatch(addLastname(values.lastname));
        dispatch(addDate(formattedDate));
        dispatch(addNation(values.nation));
        dispatch(addIdcard(values.idcard));
        dispatch(addGender(values.gender));
        dispatch(addPhoneumber(values.phonenumber));
        dispatch(addPassport(values.passport));
        dispatch(addSalary(values.salary));

        // บันทึกข้อมูลฟอร์มลงใน local storage
        localStorage.setItem("formData", JSON.stringify(values));
    };

    const handleEdit = (record) => {
        const updatedData = {
            ...record,
            firstname: 'New Firstname',
            gender: 'New Gender',
            phonenumber: 'New Phonenumber',
            nation: 'New Nation',
        };

        localStorage.setItem('firstname', updatedData.firstname);
        localStorage.setItem('gender', updatedData.gender);
        localStorage.setItem('phonenumber', updatedData.phonenumber);
        localStorage.setItem('nation', updatedData.nation);


    };








    return (
        <>
            {/* {Navbar} */}
            <div className='flex flex-row justify-between mt-10'>
                <div className='text-[2rem] ml-10'>
                    {t('การจัดการหน้าฟอร์ม')}
                </div>
                <div className='flex flex-col mr-10'>
                    <select value={i18n.language} onChange={handleLanguageChange}>
                        <option value="th">ไทย</option>
                        <option value="en">English</option>
                    </select>
                    <button className='border-2 mt-5 rouder-xl'>{t('หน้าหลัก')}</button>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center  '>
                {/* {Form} */}
                {/* <div className='flex justify-center items-center ml-10 mt-10' style={{ width: '1000px' }}> */}
                <div className='border-2 rounded-xl border-black'>

                    <Form onFinish={onFinish} form={form} name="my-form"
                        className=' ml-5 mr-5  mt-5 '>
                        {/* {1} */}
                        <Form.Item>
                            <Form.Item style={{ display: 'inline-block' }} name="prefix" label={t("คำนำหน้า")}
                                rules={[{ required: true }]}>
                                <Select style={{ width: '100px' }}>
                                    <Option value="male">นาย</Option>
                                    <Option value="female">นางสาว</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className='ml-2' style={{ display: 'inline-block' }} name="firstname" label={t("ชื่อ")} rules={[{ required: true }]}>
                                <Input value="firstname" style={{ width: '300px' }} />
                            </Form.Item>
                            <Form.Item className='ml-2' style={{ display: 'inline-block' }} name="lastname" label={t("นามสกุล")} rules={[{ required: true }]}>
                                <Input value="lastname" style={{ width: '300px' }} />
                            </Form.Item>
                        </Form.Item>

                        {/* {2} */}
                        <Form.Item>
                            <Form.Item style={{ display: 'inline-block' }} name="date" label={t("วันเกิด")} {...config}>
                                <DatePicker placeholder='วัน/เดือน/ปี' />
                            </Form.Item>
                            <Form.Item className='ml-10' name="nation"
                                style={{ display: 'inline-block' }} label={t("สัญชาติ")} rules={[{ required: true }]}>
                                <Select placeholder='กรุณาเลือก' style={{ width: '300px' }}>
                                    <Option value="thailand">ไทย</Option>
                                    <Option value="england">อังกฤษ</Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>

                        {/* {3} */}
                        <Form.Item>
                            <Form.Item style={{ display: 'inline-block' }}
                                name="idcard"
                                label={t("เลขบัตรประชาชน")}

                            >
                                <Space.Compact   >
                                    <Input style={{ width: '300px' }} maxLength={13} />
                                </Space.Compact>
                            </Form.Item>
                        </Form.Item>

                        {/* {4} */}
                        <Form.Item>
                            <Form.Item label={t("เพศ")} name="gender" rules={[{ required: true, }]}>
                                <Radio.Group>
                                    <Radio value="male"> ชาย </Radio>
                                    <Radio value="female"> หญิง </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form.Item>

                        {/* {5} */}
                        <Form.Item>
                            <Form.Item label={t("หมายเลขโทรศัพท์")} name="phonenumber" rules={[{ required: true, }]}>
                                <div style={{ display: 'flex' }}>
                                    <Select placeholder='+66' style={{ width: '80px' }}>
                                        <Option value="66">+66</Option>
                                        <Option value="99">+99</Option>
                                    </Select>
                                    <span className='px-2'> - </span>
                                    <Input type='number' style={{ width: '300px' }} placeholder="เบอร์โทรศัพท์" />
                                </div>
                            </Form.Item>
                        </Form.Item>

                        {/* {6} */}
                        <Form.Item label={t("หนังสือเดินทาง")} name="passport">
                            <Input maxLength={9} style={{ width: '300px' }} />
                        </Form.Item>

                        {/* {7} */}
                        <Form.Item>
                            <Form.Item style={{ display: 'inline-block' }} label={t("เงินเดือนที่คาดหวัง")} name="salary" rules={[{ required: true, }]}>
                                <Input maxLength={9} style={{ width: '300px' }} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block' }} className='ml-20'>
                                <Button onClick={onReset}
                                    className='ml-20 bg-white text-black font-bold' type="primary" style={{ height: '50px' }} htmlType="submit">
                                    {t("ล้างข้อมูล")}
                                </Button>
                                <Button onClick={() => { }}
                                    className='ml-10 bg-white text-black font-bold' type="primary" style={{ height: '50px' }} htmlType="submit">
                                    {t("ส่งข้อมูล")}
                                </Button>

                            </Form.Item>
                        </Form.Item>

                    </Form>

                </div>

            </div >

            <div className='flex flex-col mt-20 ml-20 mr-20  '>
                <div className='flex flex-row items-center mb-5'>
                    <h1 className=''>เลือกทั้งหมด</h1>
                    <Button onClick={() => { }} className='ml-3 bg-white text-black font-bold' /*...*/>ลบข้อมูล</Button>
                </div>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>





        </>
    )
}

export default Handleform
