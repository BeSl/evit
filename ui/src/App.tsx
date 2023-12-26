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
import ProductForm from "./pages/ProductForm";

function App() {
    return (
        <BrowserRouter>
            <Route path={'/'} exact component={ProductsBackend}/>
            <Route path={'/backend'} exact component={ProductsBackend}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/profile'} component={Profile}/>
            <Route path={'/stats'} component={Stats}/>
            <Route path={'/rankings'} component={Rankings}/>
            <Route path={'/products/:id'} component={ProductForm}/>
        </BrowserRouter>
    );
}

export default App;
