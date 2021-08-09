/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Sign from '../pages/Sign/Sign';
import Main from '../pages/Main';

const Router = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/sign" component={Sign} />
    <Route path="main" component={Main} />
    <Redirect to="/login" />
  </Switch>
);
export default Router;
