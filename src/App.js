import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostsList from './components/PostList'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PostsList} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
