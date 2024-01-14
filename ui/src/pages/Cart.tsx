import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Card, Button } from 'antd';
import LayoutM from '../components/Layout';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Label } from '@mui/icons-material';
import { UserCart } from '../models/cart';
import React, {useEffect, useState}  from 'react';
import axios from 'axios';

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    count: number;
    description: string;
}

const { Meta } = Card;
const columns: ColumnsType<UserCart> = [
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    { title: 'Товар', dataIndex: 'product_name', key: 'product_name' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
    { title: 'Количество', dataIndex: 'count', key: 'count' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
      },
];


const Cart = () => {
    const [carts, setCarts] = useState<UserCart[]>([]);
    
    useEffect(() => {
        (
            async () => {
                const arr = [];
    
                const {data} = await axios.get(`cart`);
    
                setCarts(data.data);
                // setLastPage(data.meta.last_page);
                // setFilters(data.)
            }
        )()
    },);


    return (
        <LayoutM>
            <h3>Корзина</h3>
            <Table
                columns={columns}
                rowSelection={{}}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.product_description}</p>,
                    rowExpandable: (record) => record.product_name !== 'Not Expandable',
                }}
                dataSource={carts}
            />
            <Button>Оформить заказ</Button>
        </LayoutM>
    );
};

export default Cart;