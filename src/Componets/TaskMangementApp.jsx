import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Space, message, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const TaskManagementApp = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filterStatus]);

  const fetchTasks = async () => {
    try {
      const response = await axios.post('http://localhost:4000/API/task/get-all-task');
      setTasks(response.data.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    }
  };

  const filterTasks = () => {
    if (filterStatus) {
      setFilteredTasks(tasks.filter(task => task.task_status === filterStatus));
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        values["_id"] = editingTask._id;
        await axios.post('http://localhost:4000/API/task/edit-task', values);
        setTasks(prevTasks => prevTasks.map(task => (task._id === editingTask._id ? { ...values, _id: editingTask._id } : task)));
        setEditingTask(null);
      } else {
        const response = await axios.post('http://localhost:4000/API/task/add-task', values);
        setTasks(prevTasks => [...prevTasks, response.data]);
      }
      form.resetFields();
      message.success('Task saved successfully');
    } catch (error) {
      message.error('Failed to save task');
    }
  };

  const handleEdit = task => {
    setEditingTask(task);
    form.setFieldsValue(task);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.post('http://localhost:4000/API/task/delete-task', { _id });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Task Status',
      dataIndex: 'task_status',
      key: 'task_status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Task Management</h2>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="task_status" label="Task Status">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3>Tasks</h3>
        <Select
          placeholder="Filter by status"
          style={{ width: 200 }}
          onChange={handleFilterChange}
          allowClear
        >
          <Option value="completed">Completed</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </div>
      <Table columns={columns} dataSource={filteredTasks} rowKey="id" />
    </div>
  );
};

export default TaskManagementApp;
