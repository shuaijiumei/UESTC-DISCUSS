/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import React, { useEffect } from 'react';
import {
  Button, Form, Input, message,
} from 'antd';
import PropTypes from 'prop-types';
import Style from './loginPage.module.css';
import { userLogin } from '../../server/APIs';
import instance from '../../network/request';
import { setToken, getToken } from '../../utils/storeToken';

const Login = (props) => {
  useEffect(() => {
    const token = getToken('token');
    if (token) {
      props.history.push('/main');
    }
  });

  const onFinish = async (values) => {
    try {
      const res = await userLogin({ user: values });
      const { data } = res;
      let { token } = data;
      token = `Bearer ${token}`;
      // set token for global
      instance.defaults.headers.Authorization = token;
      setToken('token', token);
      message.success('登录成功');
      props.history.push('/main');
    } catch (e) {
      const errorMsg = e.response.data.errors[0].msg;

      message.error(errorMsg);
    }
  };

  return (
    <div className={Style.main}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
            登录
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
