import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space, Card, Button } from 'antd';
import LayoutM from '../components/Layout';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Label } from '@mui/icons-material';

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    count: number;
    description: string;
}

const { Meta } = Card;
const data: DataType[] = [
    {
        key: 1,
        name: 'John Brown',
        price: 32,
        count: 2,
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        price: 42,
        count: 2,
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        price: 29,
        count: 2,
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        price: 32,
        count: 2,
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
];
const columns: ColumnsType<DataType> = [
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    { title: 'Товар', dataIndex: 'name', key: 'name' },
    
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

    return (
        <LayoutM>
            <h3>Корзина</h3>
            <Table
                columns={columns}
                rowSelection={{}}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                }}
                dataSource={data}
            />
            <Button>Оформить заказ</Button>
        </LayoutM>
    );
};

export default Cart;