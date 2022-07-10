import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import './index.css';
import React from "react";
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import routes from './router';
import {RouteWithSubRoutes} from './router/common';
import {RouteInterface} from './router/interface';


const App: React.FC = () => {

    return (

        <Router>
            <div className={'App'}>
                <Switch>
                    {routes.map((route: RouteInterface, i: number) => {
                        return RouteWithSubRoutes(route, i)
                    })}
                </Switch>
            </div>
        </Router>
    )
        ;

};

ReactDOM.render(<App/>, document.getElementById("root"));



