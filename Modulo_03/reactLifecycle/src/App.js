import React, { Component } from 'react';
import Toggle from './components/toggle/Toggle';
import Users from './components/users/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }
  async componentDidMount() {
    console.log('componentDidMount de App.js');
    const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10');
    const json = await res.json();

    this.setState({
      users: json.results,
    })
  }

  handleShowUsers =(isChecked) => {
    this.setState({showUsers: isChecked});
  };

  render() {
    const {showUsers, users} = this.state;
    return (
      <div>
        <h3>React LifeCycle</h3>
        <Toggle 
          enabled={showUsers} 
          onToggle={this.handleShowUsers} 
          description="Exibir usuarios:"
          />
        <hr/>
        {showUsers && <Users users={users}/>}
      </div> 
    );
  }
}
