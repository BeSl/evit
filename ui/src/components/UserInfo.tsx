import React, { Dispatch, useState } from 'react';
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from 'react-router-dom';
import { User } from "../models/user";
import axios from 'axios';
import { setUser } from "../redux/actions/setUserAction";
import { Button, Avatar, Input, Row, Col } from 'antd';
import type { RadioChangeEvent, DescriptionsProps } from 'antd';
import { Form, Radio } from 'antd';

const UserIfo = (props: any) => {
    const [formBase] = Form.useForm();
    const [formPassword] = Form.useForm();
    const [formContact] = Form.useForm();
    // const[visible, setVisible]= useState<true>();
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
    }
    let menu;
    let visible = false;
    //   FirstName    string   `json:"first_name"`
    //   LastName     string   `json:"last_name"`
    //   Email        string   `json:"email" gorm:"unique"`
    //   Password

    if (props.user?.id) {
        menu = (
            <><Row>
                <Col span={1}>  <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /></Col>
                <Col span={8} offset={2}>
                    <Form form={formBase} style={{ maxWidth: 600 }}>
                        <Form.Item label="email">
                            <Input value={props.user?.email} placeholder="введите email" width={300}/>
                        </Form.Item>
                        <Form.Item label="Имя">
                            <Input value={props.user?.first_name} placeholder="введите имя" width={300}/>
                        </Form.Item>
                        <Form.Item label="Фамилия">
                            <Input value={props.user?.last_name} placeholder="введите фамилию" width={300}/>
                        </Form.Item>
                        <Button type="primary">Сохранить данные</Button>
                    </Form>
                </Col>
            </Row>
                <Row justify="start">
                    <Col span={8} >
                        <h3>Контактная информация</h3>
                        <Form form={formContact} style={{ maxWidth: 600 }}>
                        <Form.Item label="Адрес">
                            <Input placeholder="введите email" width={300}/>
                        </Form.Item>
                        <Form.Item label="Телефон">
                            <Input placeholder="введите имя" width={300}/>
                        </Form.Item>
                        <Form.Item label="Дополнительно">
                            <Input placeholder="введите фамилию" width={300}/>
                        </Form.Item>
                        <Button type="primary">Обновить данные</Button>
                    </Form>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col span={12} >
                    <h3>Пароль</h3>
                    <Form form={formPassword} style={{ maxWidth: 600 }}>
                        <Form.Item label="Пароль">
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item label="Подтверждение пароля">
                            <Input.Password/>
                        </Form.Item>
                        <Button type="primary">Обновить пароль</Button>
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
