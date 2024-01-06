import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import ProductsFrontend from "./pages/ProductsFrontend";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Rankings from "./pages/Rankings";
import ProductsBackend from "./pages/ProductsBackend";
import ProductCategories from "./pages/ProductCategories";
import ProductForm from "./pages/ProductForm";
import UserWishlist from './pages/UserWishlist';
import Cart from './pages/Cart';
import ContactInfo from './pages/Contacts';
import Adversing from './pages/Adversig';

function App() {
    return (
        <BrowserRouter>
            <Route path={'/'} exact component={ProductsBackend}/>
            <Route path={'/backend'} exact component={ProductsBackend}/>
            <Route path={'/productscat/:id'} component={ProductCategories}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/profile'} component={Profile}/>
            <Route path={'/stats'} component={Stats}/>
            <Route path={'/rankings'} component={Rankings}/>
            <Route path={'/products/:id'} component={ProductForm}/>
            <Route path={'/wishlist'} component={UserWishlist}/>
            <Route path={'/cart'} component={Cart}/>
            <Route path={'/contact'} component={ContactInfo}/>
            <Route path={'/adversing'} component={Adversing}/>
        </BrowserRouter>
    );
}

export default App;
