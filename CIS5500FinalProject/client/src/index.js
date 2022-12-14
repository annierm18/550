import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import RecommendationsPage from './pages/RecommendationsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/country"
							render={() => (
								<CountryPage />
							)}
							component={CountryPage}/>
				<Route exact
							path="/rec"
							render={() => (
								<RecommendationsPage />
							)}
							component={RecommendationsPage}
							/>
				<Route exact
							path="/movieDetails"
							render={() => (
								<MovieDetailsPage />
							)}
							component={MovieDetailsPage}
							/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

