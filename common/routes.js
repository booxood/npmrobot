import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Result from './components/Result'
import Confirmation from './components/Confirmation'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainSection} />
    <Route path="result" component={Result} />
    <Route path="confirm" component={Confirmation} />
  </Route>
)
