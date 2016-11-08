import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import SubHeader from 'material-ui/lib/Subheader';
import IconButton from 'material-ui/lib/icon-button';
import ChevronRightIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';

import TodosStore from './TodosStore';


class Todos extends React.Component {
  
  constructor() {
      super();
      this.styles = {
        float: 'left',
        width: '50%',
        margin: '3%',
        fontSize: '24px'
      };
      this.state = { todos: [] };
  }

  componentDidMount() {
    TodosStore.getAll().then((data) => {
      console.log('get all', data);
      this.setState({
        todos: data.todos
      });
    });
    
    TodosStore.subscribe((action) => {
      this.setState({
        todos: action.todos
      });
    });
  }
  
  handleClick(note) {
    TodosStore.remove(note);
  }
  
  create(todo) {
    return (<ListItem 
              onMouseDown={this.handleClick.bind(null, todo)} 
              key={todo.id}
              leftIcon={<ChevronRightIcon />}
              primaryText={todo.text}
              secondaryText={todo.timestamp}>
           </ListItem>
    );
  }

  render() {
    const todos = this.state.todos.map(this.create.bind(this));
    return (
      <div>
        <List style={this.styles}>
          <SubHeader>Tasks: {todos.length}</SubHeader>
          {todos}
        </List>
      </div>
    );
  }
}

export default Todos;
