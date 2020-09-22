import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
