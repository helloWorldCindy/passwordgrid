import React, { Component } from 'react';
import './App.css';
import Container from './components/Container'
import Grid from './components/Grid'

class App extends Component {
  render() {
    return (
			// <div>
			// 	<p>
			// 		<b>
			// 			<a href="https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Multiple%20Targets">
			// 				Browse the Source
			// 			</a>
			// 		</b>
			// 	</p>
			// 	<p>This is a slightly more interesting example.</p>
			// 	<p>
			// 		It demonstrates how a single drop target may accept multiple types,
			// 		and how those types may be derived from props. It also demonstrates
			// 		the handling of native files and URLs (try dropping them onto the last
			// 		two dustbins).
			// 	</p>
			// 	<Container />
			// </div>
			<Grid />
		)
  }
}

export default App;
