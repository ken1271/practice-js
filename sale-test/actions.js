/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
//export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const DELETE='DELETE'
export const EDITING='EDITING'
export const EDITED='EDITED'
export const CANCEL='CANCEL'
/*
 * 其他常數
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
export const IsEditing={
  IS_EDITING:'IS_EDITING',
  NOT_EDITING:'NOT_EDITING'
}
/*
 * action creators
 */

let nextTodoId = 0;

export function addTodo(sale) {
  //console.log('addTodo action')
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    sale
  };
}
export function deleted(id){
  console.log('del');
  return{ type:DELETE,id }
}
// export function completeTodo(id) {
//   return { type: COMPLETE_TODO, id }
// }
export function editing(sale){
  return{type:EDITING,sale}
}
export function edited(sale){
  return{type:EDITED,sale}
}
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
