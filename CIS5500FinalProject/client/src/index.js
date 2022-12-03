import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';
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
							path="/players"
							render={() => (
								<PlayersPage />
							)}
							component={PlayersPage}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}
							/>
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

