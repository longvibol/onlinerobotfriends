import React, { Component } from 'react';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry'
import Scroll from '../components/Scroll';


class App extends Component {
	constructor () {
		//use super when we want to use props in Component
		super()
		// state is the property in React to store what have change
		this.state = {
			robots: [],
			searchfield: ''
		}
		
	}
	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {this.setState({ robots: users})});		
	}


	// onSearchChange is the new function we crate
	onSearchChange = (event )=> {
		//when we need to chage state use this :
		this.setState({ searchfield: event.target.value})
	}
	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

	// if (robots.length === 0) = if (!robots.length)
	return !robots.length ? <h1>Loading...</h1> :
			( 
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>						
						<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);	
		}		
}

export default App;