import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import { Router, Switch, Route } from 'react-router-dom';
import AboutUs from './components/pages/AboutUs';

import Log from './components/pages/Log';
import Register from './components/pages/Register';
import AboutPage from './components/pages/AboutPage';
import Dashboard from './components/pages/Dashboard';
import history from './history';

class App extends React.Component{
  state={
    isLog:false
  }

  handleLogin = (isLog) => this.setState({isLog})
  render(){
    return (
        <>
          <Router history={history}>
            <Switch>
              !isLog ?
              <Route exact path='/' render={() => <Log isLogin={this.handleLogin}/>}/>
              <Route exact path='/register' render={() => <Register isLogin={this.handleLogin}/>}/>

              <Route path='/home' exact component={Home} />
              <Route path='/aboutus' component={AboutUs} />
              <Route path='/aboutpage' exact component={AboutPage} />
              <Route path='/dashboard' exact component={Dashboard} />

            </Switch>
          </Router>
        </>
    )

  }
}


export default App;
