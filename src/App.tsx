import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostsList from './components/PagePost/PostList'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Header from './components/Header'
import SignUp from './components/Auth/SignUp'
import SinglePostPage from './components/PagePost/SinglePostPage'
import SignIn from './components/Auth/SignIn'
import AddPostForm from './components/PagePost/AddPostForm'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import EditPostForm from './components/PagePost/EditPostForm'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/post" component={PostsList} />
        <Route exact path="/posts/:postId" component={SinglePostPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/createpost" component={AddPostForm} />
        <PrivateRoute path="/editpost/:postId" component={EditPostForm} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
