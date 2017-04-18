import React from 'react';
import ReactDOM from 'react-dom';
import usersbase from './usersbase';
// import "../scss/style.scss";

document.addEventListener('DOMContentLoaded', function(){

  class UsersApp extends React.Component {
    render(){
      return <div>
        <AddUsers/>
        <UserList users={usersbase}/>
      </div>
    }
  }
  class AddUsers extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        displayInput: "none",
        displayButton: "block",
        name: "Name...",
        email: "E-mail...",
        newUsers: []
      }
    }

    handleShowInputs = () => {
      this.setState({
        displayButton: "none",
        displayInput: "block"
      });
    }

    handleNameChange = (event) => {
      this.setState({
        name: event.target.value
      });
    }

    handleEmailChange = (event) => {
      this.setState({
        email: event.target.value
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();

      let nameToAdd = this.state.name;
      let emailToAdd = this.state.email;
      let copyNewUsers = this.state.newUsers.slice();

      copyNewUsers.unshift(nameToAdd, emailToAdd);
      this.setState({
        newUsers: copyNewUsers
      });
    }
    render(){
      const newUsersItem = this.state.newUsers.map( (item) => {
        return <div>
          {item}
        </div>
      });
      return <div>
          <button style={{display: this.state.displayButton}} onClick={this.handleShowInputs}>Add User</button>
          <div style={{display: this.state.displayInput}}>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
              <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
            {newUsersItem}
      </div>
    }
  }

  class UserList extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        users: this.props.users
        }
    }
    handleRowsDelete = (elem, index) => {
      let usersCopy = this.state.users;
      usersCopy.splice(index, 1);
      this.setState({
        users: usersCopy
      });
    }
    render(){
      const listItem = this.state.users.map( (element) => {
        return <UserRow
          key = {element.email}
          number={element.id}
          userName={element.name}
          userEmail={element.email}
          onRowDel={this.handleRowsDelete.bind(this)}/>
      });
      return <table>
        <thead>
          <tr>
            <th>Lp.</th>
            <th>User</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {listItem}
        </tbody>
      </table>
    }
  }
  class UserRow extends React.Component {
  handleRowDel = (element) => {
    if (typeof this.props.onRowDel == 'function') {
      this.props.onRowDel(this.props.element);
    }
  }
  render(){
    return <tr>
            <td>
              {this.props.number}
            </td>
            <td>
              {this.props.userName}
            </td>
            <td>
              {this.props.userEmail}
            </td>
            <td>
              <input type="button" value="Remove" onClick={this.handleRowDel.bind(this)}/>
            </td>
          </tr>
  }
}

  class App extends React.Component {
    render(){
      return <div>
        <UsersApp/>
      </div>
    }
  }
  ReactDOM.render(
      <App/>,
      document.getElementById('app')
  );
});
