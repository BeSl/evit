import React, { useState } from 'react';
import { Product } from "../models/product";
import { Filters } from "../models/filters";
import axios from "axios";
import { Button, Breadcrumb, Card, Image, Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const { Meta } = Card;
const gridStyle: React.CSSProperties = {
    width: '20%',
    height: '20%',
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

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Золото</Breadcrumb.Item>
                <Breadcrumb.Item>Браслеты</Breadcrumb.Item>
            </Breadcrumb>
            <Card title="Наши товары">
                {props.products.map(product => {
                    return (
                        <Card.Grid style={gridStyle}
                            hoverable >
                            <Image
                                src={product.image}
                            />
                            <Meta title={product.title} description={product.description} />
                            <Button>Купить ${product.price}</Button>
                        </Card.Grid>
                    )
                })}
            </Card>
            <Pagination current={props.filters.page} onChange={onChange} total={props.products.length} />
        </>
    );
};

export default Products;
