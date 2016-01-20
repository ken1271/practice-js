import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { edited,editing,addTodo, deleted, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

class App extends Component {
  render() {
    // 藉由 connect() 呼叫而注入的：
    const { dispatch, visibleTodos, visibilityFilter,isEdit } = this.props
    return (
      <div>
        <AddTodo
          isEdit={isEdit}
          onEditedClick={sale=>dispatch(edited(sale))}
          onAddClick={sale =>
            dispatch(addTodo(sale))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            dispatch(deleted(id))
          }
          onEditClick={(sale)=>dispatch(editing(sale))}/>
      </div>
    )
  }
}

App.propTypes = {
  isEdit:PropTypes.object.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    sale: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  //console.log(filter)
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}
function isEditing(state){
  for(let key in state){
    if(state[key].isediting==='IS_EDITING'){return state[key]}
  }
  return state
}
// 我們想要從給定的全域 state 注入哪些 props?
// 提醒: 使用 https://github.com/faassen/reselect 來增進效能。
function select(state) {
  //console.log('select')
  //console.log('select',state)
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    isEdit:isEditing(state.todos)
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
