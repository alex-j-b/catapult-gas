// React
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Routes from './Routes';
import './App.css';
// Libs
import axios from 'axios';


function App() {
    const [data, setData] = useState();
    const [total, setTotal] = useState('0');

    useEffect(() => {
        // Featch last 10 days gas data
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:4000/gas10');
                setData(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="app-background">

            <div className="app-header">
                <a href="/" className="logo small"></a>
                <h1 className="title">Daily gas consumption (L)</h1>
                <h1 className="total">Total: {total}</h1>
            </div>

            <div className="app-wrap">
                <div className="app-menu">
                    <NavLink to="/" activeClassName="current-route" exact={true}>ALL</NavLink>
                    <NavLink to="/each" activeClassName="current-route">EACH</NavLink>
                    <NavLink to="/d/1" activeClassName="current-route">D1</NavLink>
                    <NavLink to="/d/2" activeClassName="current-route">D2</NavLink>
                    <NavLink to="/d/3" activeClassName="current-route">D3</NavLink>
                    <NavLink to="/d/4" activeClassName="current-route">D4</NavLink>
                    <NavLink to="/d/5" activeClassName="current-route">D5</NavLink>
                </div>

                <div className="app-main">
                    { data && <Routes data={data} setTotal={setTotal} /> }
                </div>
            </div>

        </div>
    );
}

export default App;
