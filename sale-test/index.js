import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'
// const logger = store => next => action => {
//   //console.log(next)
//   console.log('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }
//
// const crashReporter = store => next => action => {
//   try {
//     return next(action)
//   } catch (err) {
//     console.error('Caught an exception!', err)
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState()
//       }
//     })
//     throw err
//   }
// }
//
// // applyMiddleware 接收 createStore() 並回傳
// // 一個包含相容的 API 的 function。
// let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)
// let store = createStoreWithMiddleware(todoApp)
// console.log('store:',store);
let store = createStore(todoApp)
console.log('store:',store);
let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
