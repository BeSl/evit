import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { User } from "../models/user";
import ProductsTOP from '../pages/ProductsTOP';
import axios from 'axios';
import { AdverOffer } from '../models/adver';

const Header = (props: { user: User }) => {
    const [offers, setOffers] = useState<AdverOffer[]>([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('productstop');
                setOffers(data.data);
            }
        )()
    }, []);

    let buttons;

    if (!props.user?.id) {
        buttons = (
            <p>
                <Link to={'/login'} className="btn btn-primary my-2">Войти</Link>
                <Link to={'/register'} className="btn btn-primary my-2">Регистрация</Link>
            </p>
        )
    }

    return (
        <section className="text-center container mx-auto">
            <ProductsTOP products={offers} />
        </section>


    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    })
)(Header);
