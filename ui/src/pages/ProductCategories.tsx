import React, {useEffect, useState} from 'react';
import LayoutM from "../components/Layout";
import axios from 'axios';
import { AppstoreOutlined, ContactsOutlined, SendOutlined, UserOutlined, DatabaseTwoTone, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Layout, Menu, Image, Tooltip, Button, Input, Flex, Avatar, message } from 'antd';
import { AdverOffer } from '../models/adver';
import ProductsTOP from '../pages/ProductsTOP';
import Products from "../pages/Products";
import {Product} from "../models/product";
import {Filters} from "../models/filters";

const { Header, Content, Sider ,Footer} = Layout;

const ProductCategories = (props: any) => {
    const [offers, setOffers] = useState<AdverOffer[]>([]);
    const [lastPage, setLastPage] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
      s: '',
      sort: '',
      page: 1
  });

      useEffect(() => {
        (
            async () => {
                const arr = [];
  
                const {data} = await axios.get(`productscat/${props.match.params.id}`);
  
                setProducts(filters.page === 1 ? data.data : [...products, ...data.data]);
                setLastPage(data.meta.last_page);
            }
        )()
    }, [filters]);

    return (
        <LayoutM>
            <Content
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
              }}
            >
            <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage}/> 
            </Content>
            </LayoutM>
    );
};

export default ProductCategories;
