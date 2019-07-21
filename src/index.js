import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import App from './components/App'
import reducer from './reducers'
import middleware from './middleware' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
