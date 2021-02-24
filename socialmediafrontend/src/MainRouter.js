import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'; 
import signup from './user/signup'
import signin from './user/signin'

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={signup}></Route>
            <Route exact path="/signin" component={signin}></Route>
        </Switch>
    </div>
);

export default MainRouter;
