import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, {useEffect, useState}  from 'react';
import { Avatar, List, Space } from 'antd';
import LayoutM from '../components/Layout';
import axios from 'axios';
import {Product} from "../models/product";

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const UserWishlist = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (
        async () => {
            const arr = [];

            const {data} = await axios.get(`userwislist`);

            setProducts(data.data);
            // setLastPage(data.meta.last_page);
            // setFilters(data.)
        }
    )()
},);
return(
    <LayoutM>
    <h2>Избранное</h2>
<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 6,
    }}
    dataSource={products}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={item.image}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.image} />}
          title={<a href="{item.id}">{item.title}</a>}
          description={item.description}
        />
        {/* {item.description} */}
      </List.Item>
    )}
  />
  </LayoutM>
    );
};

export default UserWishlist;