import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import User from './Profile/User';
import Dashboard from './Dashboard/Dashboard';
import NavigationBar from './Navbar/NavigationBar';
import Stats from './Stats/Stats';
import Search from './Search/Search';
import Answer from './Answer/Answer';
import Question from './Question/Question';
import Anonymous from './Anonymous/Anonymous';
import Cookies from 'js-cookie';
import Content from './Content/Content';
import Topic from './Search/Topic';
import Show_answer from './Show_answer/Show_answer';


export class Main extends Component {

  render() {
    return (
      <div>
        {(Cookies.get('session') === "true")
          ? <Route path="/" component={NavigationBar} />
          : <Route path="/" component={Login} />}
        <Route path="/home" component={Dashboard} />
        <Route path="/user/:userid" component={User} />
        <Route path="/answer" component={Answer} />
        <Route path="/answer/:answerid" component={Show_answer} />
        <Route path="/search" component={Search} />
        <Route path="/stats" component={Stats} />
        <Route path="/question/:questionid" component={Question} />
        <Route path="/topic/:topic_name" component={Topic} />
        <Route path="/anonymous/:anonymousid" component={Anonymous} />
        <Route path="/content" component={Content} />
      </div>
    )
  }
}

export default Main
