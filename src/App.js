import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostsList from './components/PostList'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Header from './components/Header'
import SignUp from './components/SignUp'
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/post" component={PostsList} />
        <Route path="/signup" component={SignUp} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
