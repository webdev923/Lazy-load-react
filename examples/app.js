import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';

import Decorator from './pages/decorator';
import Normal from './pages/normal';
import Scroll from './pages/scroll';
import Overflow from './pages/overflow';
import Image from './pages/image';
import Debounce from './pages/debounce';

const Home = () => (
  <ul>
    <li><Link to="/normal">normal</Link></li>
    <li><Link to="/image">using with <code>&lt;img&gt;</code></Link></li>
    <li><Link to="/decorator">using with <code>decorator</code></Link></li>
    <li><Link to="/scroll">using with <code>scrollTo</code></Link></li>
    <li><Link to="/overflow">using inside overflow container</Link></li>
    <li><Link to="/debounce">using <code>debounce</code></Link></li>
  </ul>
);

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/image" component={Image} />
    <Route path="/decorator" component={Decorator} />
    <Route path="/normal" component={Normal} />
    <Route path="/scroll" component={Scroll} />
    <Route path="/overflow" component={Overflow} />
    <Route path="/debounce" component={Debounce} />
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
