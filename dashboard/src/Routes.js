//React
import React from 'react';
import { Switch, Route } from 'react-router-dom';
//Pages
import Chart from './components/Chart';


export default function Routes({ data, setTotal }) {
    return (
        <Switch>
            <Route exact path='/' render={(props) => ( <Chart {...props} data={data} setTotal={setTotal} />)}/>
            <Route exact path='/:option' render={(props) => ( <Chart {...props} data={data} setTotal={setTotal} />)}/>
            <Route exact path='/:option/:deviceId' render={(props) => ( <Chart {...props} data={data} setTotal={setTotal} />)}/>
        </Switch>
    );
}
