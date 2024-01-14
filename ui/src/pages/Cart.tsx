import { Button } from 'antd';
import LayoutM from '../components/Layout';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserCart } from '../models/cart';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, message } from 'antd';

// interface DataType {
//     key: React.Key;
//     name: string;
//     price: number;
//     count: number;
//     description: string;
// }

// const { Meta } = Card;



const Cart = () => {
    const [carts, setCarts] = useState<UserCart[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [messageApi, contextHolder] = message.useMessage();
    const success = (text: string) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const columns: ColumnsType<UserCart> = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
        { title: 'Товар', dataIndex: 'product_name', key: 'product_name' },
        { title: 'Цена', dataIndex: 'price', key: 'price' },
        { title: 'Количество', dataIndex: 'count', key: 'count' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (_, record) => <>{contextHolder}<Button onClick={()=>{deleteRow(record)}}>Delete</Button></>,
        },
    ];

    const deleteRow = (uc: UserCart) =>{
        success("Удалил из корзины "+uc.product_name);
         axios.delete(`cart/${uc.key}`);
    }

    useEffect(() => {
        (
            async () => {
                const arr = [];
                const { data } = await axios.get(`cart`);
                setCarts(data.data);
            }
        )()
    },);

    const createOrder = async() => {
        
        let carts = JSON.stringify(selectedRowKeys);

        const { data } = await axios.post(`neworder`,
        {   carts
        });

        if (data.data !=0) {
            success("Заказ оформлен. Номер заказа "+ data.data);
        }else{
            success("Ошибка оформления");
        }
    }

    return (
        <LayoutM>
            <h3>Корзина</h3>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.product_description}</p>,
                    rowExpandable: (record) => record.product_name !== 'Not Expandable',
                }}
                dataSource={carts}
            />
            <>
                {contextHolder}
                <Button onClick={createOrder}>Оформить заказ</Button>

            </>
        </LayoutM>
    );
};

export default Cart;