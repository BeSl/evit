import React, { Dispatch, useEffect, useState } from 'react';
import HeaderM from "./Header";
import axios from 'axios';
import { Redirect, useLocation } from "react-router-dom";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";
import { connect } from "react-redux";
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';

const {Footer} = Layout;

const LayoutM = (props: any) => {
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('user');

                    props.setUser(data);

                } catch (e) {
                }
            }
        )();
    }, []);

    const header = <HeaderM />;


    return (
        <Layout >
          {header}
        <Layout>
          <Layout style={{ padding: '0 2px 2px' }}>
              {props.children}
          </Layout>
        </Layout>
        <Footer >
          <h2>Это Footer. Нужно потом что-то разместить</h2></Footer>
      </Layout>        
    );
};

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutM);
