import React, {useState } from 'react';
import '../Login.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Button, Flex, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LayoutM from '../components/Layout';
import { message } from 'antd';

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [form] = Form.useForm<{ username: string; email: string }>();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (text: string) => {
    messageApi.open({
        type: 'error',
        content: text,
    });
};
  const onFinish = async (values: any) => {
    try{
    let email =  values.username;
    let password = values.password;
       await axios.post('login', {
        email,
        password
     });
     setRedirect(true);
    } catch (e: any) {
      error("Ошибка авторизации. Попробуйте позже");
  }
  };

  if (redirect) {
    return <Redirect to={'/profile'} />;
  }else{
    console.log('Error:', "failed login");
  }

  return (
    <LayoutM>

      <Flex gap="middle" align="center" vertical>
        <h1>Авторизуйтесь</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите свой логин!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Забыл пароль
            </a>
          </Form.Item>

          <Form.Item>
            <>
            {contextHolder}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
            </>
            Или <a href="/register">Зарегистрироваться!</a>
          </Form.Item>
        </Form>
      </Flex>
    </LayoutM>
  );
};

export default Login;
