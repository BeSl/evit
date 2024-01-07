import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { User } from "../models/user";
import axios from 'axios';
import {UserOutlined, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Layout, Tooltip, Button, Input, Flex, Avatar, message } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const { Search } = Input;
const { Header } = Layout;



const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#fff',
  height: 100,
  paddingInline: 70,
  lineHeight: '64px',
  opacity: 50,
  backgroundColor: '#87CEEB',
};

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.'+ e.key);
  window.location.assign('/productscat/'+e.key);
  console.log('click', e);
};
// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


const HeaderM = (props: { user: User }) => {
  const [current, setCurrent] = useState('mail');
  const [items, setMenu] = useState();
//categories
const menuProps = {
  items,
  onClick: handleMenuClick,
};
  let buttons;
  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get('categories');
        setMenu(data);
      }
    )()
  }, []);
  if (!props.user?.id) {
    buttons = (
      <p>
        {/* <Button view="normal">Normal</Button> */}
        <Link to={'/login'} className="btn btn-primary my-2">Войти</Link>
        <Link to={'/register'} className="btn btn-primary my-2">Регистрация</Link>
      </p>
    )
  }
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Header style={headerStyle}>
      <Flex justify='space-between' gap='middle' align='center'>
        <Flex justify='flex-start' gap='middle' align='center'>
          {/* <Image src='http://192.168.1.119:3030/logo/mainlogo.jpg'/> */}
          <h1>EVitrine</h1>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Каталог
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button type="default" href='/adversing'>Акции</Button>
          <Button type="default" href='/contact'>Контакты</Button>
        </Flex>
        <Tooltip title="Искать на сайте">
          <Search
            placeholder="введите текст для поиска"
            allowClear
            enterButton="Найти"
            size="large"
          // onSearch={onSearch}
          />
        </Tooltip>
        <Flex justify='flex-end' gap='middle' align='center'>
          <Tooltip title="Личный кабинет">
            <Badge count={3} color='DodgerBlue'>
              <a href="/profile">
                <Avatar style={{ backgroundColor: '#4169E1' }} shape="circle" icon={<UserOutlined />} />
              </a>
            </Badge>
          </Tooltip>
          <Tooltip title="Избранное">
            <Badge count={0}>
              <a href="/wishlist">
                <Avatar style={{ backgroundColor: '#4169E1' }} shape="circle" icon={<HeartTwoTone />} />
              </a>
            </Badge>
          </Tooltip>
          <Tooltip title="Корзина">
            <Badge count={88}>
            <a href="/cart">
              <Avatar style={{ backgroundColor: '#4169E1' }} shape="circle" icon={<ShoppingCartOutlined />} />
            </a>
            </Badge>
          </Tooltip>
        </Flex>
      </Flex>
    </Header>

  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user
  })
)(HeaderM);
