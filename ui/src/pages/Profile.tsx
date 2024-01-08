import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";
import LayoutM from "../components/Layout";
import { Button } from 'antd';
import { LogoutOutlined, CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme,Divider } from 'antd';
import type { CSSProperties } from 'react';
import UserInfo from '../components/UserInfo';
import { Redirect } from 'react-router-dom';

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: 'Информация о профиле',
        children: <UserInfo/>,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'История заказов',
        children: <h2>История заказов</h2>,
        style: panelStyle,
    },
];

const Profile = (props: any) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
        <Redirect to={'/login'} />;
      }
      const login = async () => {
          <Redirect to={'/login'} />;
      }
      
    useEffect(() => {
        setFirstName(props.user?.first_name);
        setLastName(props.user?.last_name);
        setEmail(props.user?.email);
    }, [props?.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const { data } = await axios.put('users/info', {
            first_name,
            last_name,
            email
        });

        props.setUser(data);
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/password', {
            password,
            password_confirm
        })
    }
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: '#ffffff',
         borderRadius: 10,
        border: 'none',
    };
    let btn;
    if (props.user?.id) {
        btn = <Button icon={<LogoutOutlined />} onClick={logout}> Выйти из профиля</Button>    
    }else{
        btn =  <Button icon={<LogoutOutlined />} href='/login'> Авторизоваться</Button>    
    }


    return (
        <LayoutM >
            <div>
                <h1>Профиль пользователя {props.user?.email}</h1>
                {btn}                
            </div>
            <Divider orientation="left"></Divider>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                //   style={{ background: token.colorBgContainer }}
                items={getItems(panelStyle)}
            />
        </LayoutM>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Profile);
