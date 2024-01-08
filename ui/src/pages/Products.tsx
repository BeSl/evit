import React, { useState } from 'react';
import { Product } from "../models/product";
import { Filters } from "../models/filters";
import axios from "axios";
import { Button, Breadcrumb, Badge, Flex, Card, Pagination, Typography } from 'antd';
import { AppstoreOutlined, HeartOutlined, SendOutlined, UserOutlined, DatabaseTwoTone, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import { Form, message } from 'antd';

const cardStyle: React.CSSProperties = {
    width: 600,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
};
const { Meta } = Card;
const gridStyle: React.CSSProperties = {
    width: '20%',
    height: '15%',

    textAlign: 'center',
    padding: '24px',
    margin: '24px'
};
// const [current, setCurrent] = useState(3);

const Products = (props: {
    products: Product[],
    filters: Filters,
    setFilters: (filters: Filters) => void,
    lastPage: number
}) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    });

    const [messageApi, contextHolder] = message.useMessage();

    const success = (text: string) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        load();
        // setCurrent(page);
    };

    const search = (s: string) => {
        props.setFilters({
            ...props.filters,
            page: 1,
            s
        });
    }

    const sort = (sort: string) => {
        props.setFilters({
            ...props.filters,
            page: 1,
            sort
        })
    }

    const load = () => {
        props.setFilters({
            ...props.filters,
            page: props.filters.page + 1
        })
    }

    const select = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    let button;

    if (props.filters.page != props.lastPage) {
        button = (
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={load}>Load More</button>
            </div>
        )
    }

    let info;

    if (notify.show) {
        info = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        )
    }

    const addCart = () => {
        success("Добавлено в заказ");
    }
    
    const addWishList = (name: string) =>{
success("Добавлено в избранное "+name);
    }
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Золото</Breadcrumb.Item>
                <Breadcrumb.Item>Браслеты</Breadcrumb.Item>
            </Breadcrumb>
            <Card title="Наши товары">
                {props.products.map(product => {
                    return (
                        <Card.Grid 
                            hoverable >
                            <Flex justify="space-between">
                                <Badge.Ribbon text="Осталось мало" color="red">
                                    <img
                                        alt="avatar"
                                        src={product.image}
                                        style={imgStyle}
                                    />
                                </Badge.Ribbon>
                                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 12 }}>
                                <Flex align="flex-end" justify="space-between" style={{ padding: 0 }}>
                                <>
                                {contextHolder}
                                <HeartOutlined onClick={()=>addWishList(product.title)} style={{ color: '#f5222d', fontSize:20 }} />
                                </>
                                </Flex>
                                    <Typography.Title level={3}>
                                        {product.title}
                                    </Typography.Title>
                                    <Typography.Title level={5}>
                                        {product.description}
                                    </Typography.Title>
                                    <Typography.Text delete>$9999</Typography.Text>
                                    <Typography.Text type="success">${product.price}</Typography.Text>
                                    <>
                                {contextHolder}
                                    <Button onClick={addCart}   target="_blank">
                                        В заказ 
                                    </Button>
                                    </>
                                </Flex>
                            </Flex>
                        </Card.Grid>

                    )
                })}
            </Card>
            <Pagination current={props.filters.page} onChange={onChange} total={props.products.length} />
        </>
    );
};

export default Products;
