import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CourseUpdate from './Components/UpdateCourse';
import CourseCreate from './Components/CreateCourse';
import NotFound from './Components/NotFound';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import PrivateRoute from './Components/PrivateRoute';
import Error from "./Components/Error";
import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseCreateWithContext = withContext(CourseCreate);
const CourseUpdateWithContext = withContext(CourseUpdate);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/courses/create" component={CourseCreateWithContext}/>
        <PrivateRoute path="/courses/:id/update" component={CourseUpdateWithContext}/>
        <Route path="/courses/:id" component={CourseDetailWithContext}/>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/error" component={Error} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);