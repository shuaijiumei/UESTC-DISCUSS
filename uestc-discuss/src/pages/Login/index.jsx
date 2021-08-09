/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import React from 'react';
import {
  Button, Form, Input,
} from 'antd';
import Style from './loginPage.module.css';
import { userLogin, getCurrentUser } from '../../server/APIs';
import instance from '../../network/request';

const Login = () => {
  const onFinish = (values) => {
    userLogin({
      user: values,
    }).then((res) => {
      const { data } = res;
      let { token } = data;
      token = `Bearer ${token}`;
      // set token for global
      instance.defaults.headers.Authorization = token;
      console.log(instance.defaults.headers);
    }).catch((err) => { console.log(err); });
  };

  const onFinishFailed = () => {
    console.log('failed');
  };

  const handleSend = () => {
    getCurrentUser().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={Style.main}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={handleSend}>send</Button>
    </div>
  );
};
export default Login;
