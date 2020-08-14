import React, { Component } from 'react';
import CardList from '../Component/CardList';
import SearchBox from '../Component/SearchBox';
import './App.css';
import Scroll from '../Component/Scroll'
import ErrorBoundry from '../Component/ErrorBoundry'

class App extends Component {
constructor(){
    super()
    this.state = {
        robots : [],
        searchfield : ''
    }
}
 componentDidMount(){
     fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(user => {this.setState({robots:user})});
 }

onSearchChange = (event) =>{
    this.setState({searchfield: event.target.value})
}
    render(){
        const {robots, searchfield} = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if(!robots.length){
            return <h1>Loading</h1>
        }else{
            return(
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                    <ErrorBoundry>
                    <CardList robots={filterRobots}/>
                    </ErrorBoundry>
                    </Scroll>
                </div>
             )
        }
    }
}
export default App; 