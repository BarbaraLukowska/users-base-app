import React from 'react';
import ReactDOM from 'react-dom';
import usersbase from './usersbase';
// import "../scss/style.scss";

document.addEventListener('DOMContentLoaded', function(){

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
        <UserList users={usersbase}/>
      </div>
    }
  }
  ReactDOM.render(
      <App/>,
      document.getElementById('app')
  );
});
