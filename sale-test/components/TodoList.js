import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onDeleteClick={() => this.props.onTodoClick(todo.id)}
            onEditClick={()=>this.props.onEditClick(todo)}/>
        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    sale: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
