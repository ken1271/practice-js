import { combineReducers } from 'redux'
import { EDITED,IsEditing,EDITING,EDIT,ADD_TODO, DELETE, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters
const { NOT_EDITING,IS_EDITING }=IsEditing
function visibilityFilter(state = SHOW_ALL, action) {
  //console.log('visibilityFilter');
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
const initState=[
  {
    isediting:NOT_EDITING,
    sale:{name:'',openHour:'',id:0}
  }
]
function todo(state, action) {
  console.log('todo',state)
  switch (action.type) {
    //change the editing state and pass the value from components
    case EDITING:
      if (state.id !== action.sale.id) {
        return state
      }
      console.log('editing',state)
      return {
        ...state,
        isediting: IS_EDITING
      }
    //change the edit state to edit and modified the value
    case EDITED:
    console.log(action)
    console.log('!id edited',action.sale.id)
    console.log('!id edited',state.id)
      if (state.id !== action.sale.id) {
        return state
      }
      return {
        ...state,
        isediting: NOT_EDITING,
        sale:{name:action.sale.name,openHour:action.sale.openHour}
      }
    case ADD_TODO:
      return {
        isediting:NOT_EDITING,
        id: action.id,
        sale: action.sale,
        completed: false
      }
    // case COMPLETE_TODO:
    //   if (state.id !== action.id) {
    //     return state
    //   }
    //   console.log(state)
    //   return {
    //     ...state,
    //     completed: true
    //   }
    default:
      return state
  }
}
function todos(state = [], action) {
  switch (action.type) {

    case DELETE:
      return state.filter(todo=>todo.id!==action.id)
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    // case COMPLETE_TODO:
    //   return state.map(t =>
    //     todo(t, action)
    //   )
    case EDITING:
    console.log('Editing',state)
      return state.map(t=>todo(t,action))
    case EDITED:
      return state.map(t=>todo(t,action))
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
  //isEditing
})

export default todoApp
