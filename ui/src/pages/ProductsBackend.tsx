import React, {useEffect, useState} from 'react';
import LayoutM from "../components/Layout";
import axios from 'axios';
import {Layout} from 'antd';
import { AdverOffer } from '../models/adver';
import ProductsTOP from '../pages/ProductsTOP';
import Products from "../pages/Products";
import {Product} from "../models/product";
import {Filters} from "../models/filters";

const { Header, Content, Sider ,Footer} = Layout;

const ProductsBackend = () => {
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
            const { data } = await axios.get('banners');
            setOffers(data.data);
          }
        )()
      }, []);
      
      
      useEffect(() => {
        (
            async () => {
                const arr = [];
  
                const {data} = await axios.get(`products/backend`);
  
                setProducts(filters.page === 1 ? data.data : [...products, ...data.data]);
                setLastPage(data.meta.last_page);
                // setFilters(data.)
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
                // background: colorBgContainer,
                // borderRadius: borderRadiusLG,
              }}
            >
            <ProductsTOP products={offers} />
            <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage}/> 
            </Content>
            </LayoutM>
    );
};

export default ProductsBackend;
