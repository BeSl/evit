import React, { Dispatch } from 'react';
import { connect } from "react-redux";
import { User } from "../models/user";
import axios from 'axios';
import { setUser } from "../redux/actions/setUserAction";
import { Button, Avatar, Input, Row, Col } from 'antd';
import { Form, message } from 'antd';

const UserIfo = (props: any) => {
    const [formBase] = Form.useForm();
    const [formPassword] = Form.useForm();
    const [formContact] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (text: string) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };

    const error = (text: string) => {
        messageApi.open({
            type: 'error',
            content: text,
        });
    };

    formBase.setFieldsValue({
        first_name: props.user?.first_name,
        last_name: props.user?.last_name,
        email: props.user?.email
    });

    formContact.setFieldsValue({
        adress: props.user?.adress,
        phone: props.user?.phone,
        other: props.user?.other,
    });


    const updateBaseInfo = async () => {
        try {
            let first_name = formBase.getFieldValue("first_name");
            let last_name = formBase.getFieldValue("last_name");
            let email = formBase.getFieldValue("email");
            const { data } = await axios.put('users/info', {
                first_name,
                last_name,
                email,
            });
            props.setUser(data);
            success("Данные успешно обновлены");

        } catch (e: any) {
            error("Ошибка обновления данных. Попробуйте позже");
        }
    }

    const changePassword = async () => {
        try {
            let newpassword = formPassword.getFieldValue("password");
            const { data } = await axios.put('users/password', {
                newpassword,
            });
            props.setUser(data);
            success("Пароль обновили");

        } catch (e: any) {
            error("Ошибка обновления пароля. Попробуйте позже");
        }
    }

    const changeContactInfo = async () => {
        try {
            let adress = formContact.getFieldValue("adress");
            let phone = formContact.getFieldValue("phone");
            let other = formContact.getFieldValue("other");
            const { data } = await axios.put('users/contacts', {
                adress,
                phone,
                other,
            });
            props.setUser(data);
            success("Контакты обновили");

        } catch (e: any) {
            error("Ошибка обновления пароля. Попробуйте позже");
        }
    }

    let menu;

    if (props.user?.id) {
        menu = (
            <><Row>
                <Col span={1}>  <Avatar size={128} src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663125405_60-mykaleidoscope-ru-p-veselaya-obezyanka-instagram-65.jpg" /></Col>
                <Col span={8} offset={2}>
                    <Form form={formBase} style={{ maxWidth: 600 }}>
                        <Form.Item name="email" label="email">
                            <Input />
                        </Form.Item>
                        <Form.Item name="first_name" label="Имя" >
                            <Input />
                        </Form.Item>
                        <Form.Item name="last_name" label="Фамилия">
                            <Input />
                        </Form.Item>
                        <>
                            {contextHolder}
                            <Button type="primary" onClick={updateBaseInfo}>Сохранить данные</Button>
                        </>
                    </Form>
                </Col>
            </Row>
                <Row justify="start">
                    <Col span={8} >
                        <h3>Контактная информация</h3>
                        <Form form={formContact} style={{ maxWidth: 600 }}>
                            <Form.Item name="adress" label="Адрес">
                                <Input />
                            </Form.Item>
                            <Form.Item name="phone" label="Телефон">
                                <Input />
                            </Form.Item>
                            <Form.Item name="other" label="Дополнительно">
                                <Input />
                            </Form.Item>
                            <>
                                {contextHolder}
                                <Button onClick={changeContactInfo} type="primary">Обновить данные</Button>
                            </>
                        </Form>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col span={12} >
                        <h3>Пароль</h3>
                        <Form form={formPassword} style={{ maxWidth: 600 }}>
                            <Form.Item name="password" label="Пароль">
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="confirmpassword" label="Подтверждение пароля" dependencies={['password']} rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Введенные пароли не совпадают!'));
                                    },
                                }),
                            ]}>
                                <Input.Password />
                            </Form.Item>
                            <>
                                {contextHolder}
                                <Button onClick={changePassword} type="primary">Обновить пароль</Button>
                            </>
                        </Form>                    </Col>
                </Row>
            </>
        )
    } else {
        menu = (
            <>
                <h1>
                    Авторизуйтесь
                </h1>
            </>
        )
    }

    return (
        <>  {menu} </>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(UserIfo);
