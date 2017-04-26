import React from 'react';
import ReactDOM from 'react-dom';
import usersbase from './usersbase';
import "../scss/style.scss";

document.addEventListener('DOMContentLoaded', function() {

  class UsersApp extends React.Component {
    state = {
      users: usersbase
    };

    handleSubmit = (e) => {
      const {name, email} = e.target;
      const {users} = this.state;
      this.setState({
        users: [
          ...users, {
            name: name.value,
            email: email.value,
            id: Math.max(...Object.values(users.map((user) => user.id))) + 1
          }
        ]
      });
    };

    handleDelete = (id) => {
      this.setState({
        users: [...this.state.users.filter((user) => user.id !== id)]
      });
    }

    render() {
      return <div className="users-app">
        <AddUsers handleSubmit={this.handleSubmit}/>
        <UserList handleDelete={this.handleDelete} users={this.state.users}/>
      </div>
    };
  }
  class AddUsers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayInput: "none",
        displayButton: "block",
        name: "",
        email: "",
        isOK: true,
        isDisabled: false
      }
    }

    handleShowInputs = () => {
      this.setState({
          displayButton: "none",
          displayInput: "block"
      });
    }

    handleNameChange = (event) => {
        //only letters and 20 characters (TODO fixed polish characters)
      const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';
      const extractLetters = (str) => extract(str, "[a-zA-Z]+$");

      this.setState({
          name: extractLetters(event.target.value)
      });
      if (event.target.value.length === 20) {
          this.setState({
             isDisabled: true
          });
      }
    }

    handleEmailChange = (event) => {
      this.setState({email: event.target.value, isOK: false});
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.handleSubmit(event);
      this.handleReset();
    }

    // Cannot read property 'preventDefault' of undefined ---- ???
    handleReset = (e) => {
      e.preventDefault();
      this.setState({
          name: "",
          email: ""
      });
  }

    render() {
      return <div className="add-users">
        <button style={{display: this.state.displayButton}} onClick={this.handleShowInputs} className="add-btn">Add User</button>
        <form style={{display: this.state.displayInput}} onSubmit={this.handleSubmit}>
             <input name="name" type="text" value={this.state.name} placeholder="Name..." onChange={this.handleNameChange} disabled={this.state.isDisabled}/>
             <input name="email" type="text" value={this.state.email} placeholder="E-mail..." onChange={this.handleEmailChange}/>
             <input type="submit" value="Submit" className="submit-btn" disabled={this.state.isOK}/>
             <a href onClick={this.handleReset}>Reset fields</a>
        </form>
      </div>
    }
  }

  class UserList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: this.props.users
      }
    }

    handleRowsDelete = (elem, index) => {
      let usersCopy = this.state.users;
      usersCopy.splice(index, 1);
      this.setState({users: usersCopy});
    }
    render() {
      const listItem = this.props.users.map((element) => {
        return <UserRow
            key={element.email}
            number={element.id}
            userName={element.name}
            userEmail={element.email}
            handleDelete={this.props.handleDelete}/>
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

    handleDelete = () => {
      this.props.handleDelete(this.props.number);
    }

    render() {
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
          <input type="button" value="Remove" onClick={this.handleDelete} className="remove-btn"/>
        </td>
      </tr>
    }
  }

  class App extends React.Component {
    render() {
      return <div className="container">
        <UsersApp/>
      </div>
    }
  }
  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
