/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Table,
  Button,
  Form,
  Spin,
  notification,
  Input
} from 'antd'; 
import {
  PlusOutlined, EditFilled,
} from '@ant-design/icons';
import Constant from '../../Global/Constant';
import StudentStore from '../../Store/studentStore';
import './Students.less';
import StudentModal from './StudentsModal'
import moment from 'moment'
const { Search } = Input;

function Student() {
  const { Students }                                = StudentStore;
  const [modalVisible, setModalVisibility]          = useState(false);
  const [loading, setLoading]                       = useState(false);
  const [editing, setEditing]                       = useState(false);  
  const [form]                                      = Form.useForm();
  const [selectedStudentId, setSelectedStudentId]   = useState('');
  const [dataSource, setDataSource]                 = useState(StudentStore.Students);
  const [dateOfBirth, setDateOfBirth]               = useState(moment())
  
  const getStudentDetails = () => {
    setLoading(true);
    StudentStore.getStudentDetails((err?: Error)=> {
      setLoading(false);
      if (err) {
        notification.error({
          placement   : 'topRight',
          description : err.message,
          message     : 'Error',
          duration    : 0,
        });
      
      }
      setDataSource(StudentStore.Students)
    })
  }

  useEffect(() => {
    getStudentDetails();
  }, []);

  const showModal = async (record: any) => {
    setEditing(true)
    const studentData: any = {
      Name          : record.Name,
      StudentId     : record.StudentId,
      Course        : record.Course,
      Score         : record.Score,
    }
    setDateOfBirth(record.dateOfBirth)
    setSelectedStudentId(record._id);
    form.setFieldsValue(studentData);
    setModalVisibility(true);
  };

 

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Student ID',
      dataIndex: 'StudentId',
      key: 'StudentId',
    },
    {
      title: 'Course',
      dataIndex: 'Course',
      key: 'Course',
    },
    {
      title: 'Score',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: 'DOB',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (date: any) => <span>{date ? moment(date).format('YYYY-MM-DD') : null}</span>,

    },
    {
      key: 'action',
      render: (text: any, record: any) => <EditFilled onClick={() => showModal(record)} />,
    },
  ];
  
  
  const addButtonHandler = () => {
    form.resetFields();
    setSelectedStudentId('');
    setDateOfBirth(moment())
    setModalVisibility(true);

  };

  const saveChangeCallback = (err?: Error) => {
    if (err) {
      notification.error({
        placement: 'topRight',
        description: err.message,
        message: 'Error',
      });
      return;
    }
    setModalVisibility(false);
    getStudentDetails();
  };

  const SaveData = () => {
   
    form.validateFields()
      .then((value) => {
        const updatedData = { ...value, _id:  selectedStudentId }
        setLoading(true);
        StudentStore.createUpdateStudent(updatedData, saveChangeCallback);
        setLoading(false);

      })
      .catch(() => {
        saveChangeCallback()
      });
  };
  
  const searchTrigger = (value: any) => {
    const filteredData = Students.filter(entry =>
      entry.Name.includes(value)
    );
    setDataSource(filteredData);
  }
  return (
    <Layout.Content>
      <Typography.Title className="mb-4" level={4}>
        Students      
      </Typography.Title>
      <Spin spinning={loading}>
        <div className="position-relative">
          <Search
            placeholder="input search text"
            onSearch={value => searchTrigger(value)}
            style={{ width: 200 }}
          />
          <Table
            className="pb-5 log-table bg-white"
            columns={tableColumns}
            dataSource={dataSource}
            pagination={{
              pageSize: Constant.itemsPerPage,
              position: ['bottomCenter'],
            }}
          />
          <Button
            className="btn-add"
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
            size="large"
            onClick={addButtonHandler}
          />
        </div>
        <StudentModal
          form={form}
          modalVisible={modalVisible}
          editMode={editing}
          onSave={SaveData}
          onCancel={() => setModalVisibility(false)}
          confirmLoading={loading}
          dateOfBirth={dateOfBirth}
        />
      </Spin>
    </Layout.Content>
  );
}
export default Student;