import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from "axios";
// import {Redirect} from "react-router-dom";

const ProductForm = (props: any) => {   
    console.log(props.id);

    useEffect(() => {
        if (props.match.params.id) {
            (
                async () => {
                    const {data} = await axios.get(`products/${props.match.params.id}`);

                //     setTitle(data.title);
                //     setDescription(data.description);
                //     setImage(data.image);
                //     setPrice(data.price);
                 }
            )();
        }
    }, [])

    return (
        <div className="col" key={props.match.params.id}>
        <div
            className="card shadow-sm selected">
            {/* <img src={product.image} height={200} width={200}/> */}

            <div className="card-body">
                <p className="card-text">{props.match.params.id}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">${props.id}</small>
                </div>
            </div>
        </div>
    </div>
        );
};

export default ProductForm;
