import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import configureStore from './stores/configureStore'

import './styles/index.scss'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('app')
)
