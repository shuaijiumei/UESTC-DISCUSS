/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import React, { useEffect } from 'react';
import {
  Button, Form, Input, message, Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Style from './loginPage.module.css';
import { userLogin } from '../../server/APIs';
import instance from '../../network/request';
import { setToken, getToken } from '../../utils/storeToken';

const Login = ({ history }) => {
  useEffect(() => {
    const token = getToken('token');
    if (token) {
      history.push('/main');
    }
  });

  const onFinish = async (values) => {
    try {
      console.log(values);
      const { remember } = values;
      const res = await userLogin({ user: values });
      const { data } = res;
      let { token } = data;
      token = `Bearer ${token}`;
      // set token for global
      instance.defaults.headers.Authorization = token;
      if (remember) {
        setToken('token', token);
      }
      message.success('登录成功');
      history.push('/main');
    } catch (e) {
      const errorMsg = e.response.data.errors[0].msg;

      message.error(errorMsg);
    }
  };

  const signForAccount = async () => {
    history.push('/sign');
  };

  return (
    <div className={Style.main}>
      <Form
        name="normal_login"
        style={{
          width: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Button type="link">忘记密码</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
          {'  '}
          <Button type="link" onClick={signForAccount}>现在注册!</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
