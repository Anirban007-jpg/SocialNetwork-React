import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'; 
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/User'
import EditProfile from './user/EditProfile';
import PrivateRoute from './Auth/PrivateRoute';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from './admin/Admin'


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>
            <Route exact path="/posts/:postId" component={SinglePost}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}></PrivateRoute>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/findpeople" component={FindPeople}></PrivateRoute>
            <PrivateRoute exact path="/post/create" component={NewPost}></PrivateRoute>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>
            <PrivateRoute exact path="/admin" component={Admin} />
        </Switch>
    </div>
);

export default MainRouter;
