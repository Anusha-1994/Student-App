import React , {useState} from 'react';
import { observer } from 'mobx-react';

import {
  Modal,
  Form,
  Input,
  DatePicker,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import Constant from '../../../Global/Constant';
import moment from 'moment'

interface Props {
  form: FormInstance,
  modalVisible: boolean,
  editMode: boolean,
  onCancel?: () => void,
  onSave?: ((Student: any) => void),
  confirmLoading: boolean,
  dateOfBirth : object
}

function StudentModal(props: Props, ) {
  const {
    form, modalVisible, editMode, onCancel, onSave, confirmLoading, dateOfBirth
  } = props;
  const dateObject = {
    dateOfBirth: moment(dateOfBirth)
  };
  
  const dateFormat = "YYYY/MM/DD";
  return (
    <Modal
      title={editMode ? "Update Student Details" : "Create Student Details"}
      visible={modalVisible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText={editMode ? "Update" : "Create"}
      confirmLoading={confirmLoading}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        labelAlign="left"
        colon={false}
        onFinish={onSave}
        initialValues={dateObject}

      >
        <Form.Item
          className="mb-2"
          label="Name"
          name="Name"
          required
          rules={[
            {
              required: true,
              message: Constant.nameRequiredError,
            },
          ]}
        >
        <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          className="mb-2"
          label="Student ID"
          name="StudentId"
        >
        <Input placeholder="Enter student ID" />
        </Form.Item>
        <Form.Item
          className="mb-2"
          label="Course"
          name="Course"
        >
        <Input placeholder="Enter course" />
        </Form.Item> 
        <Form.Item
          className="mb-2"
          label="Score"
          name="Score"
        >
          <Input placeholder="Enter score" />
        </Form.Item>
        <Form.Item label="Date Of Birth" name="dateOfBirth">
          <DatePicker format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default observer(StudentModal);
