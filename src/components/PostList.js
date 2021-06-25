import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import { Waypoint } from 'react-waypoint'
import { getPosts } from '../reduxToolkit/PostSlice'

function PostList() {
  const dispatch = useDispatch()
  const { loading, error, prevPostLength, posts } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts(posts.length))
    }
  }, [dispatch])

  if (error) {
    return <h1>{error}</h1>
  }

  const WaypointStop = () => {
    if (posts.length === prevPostLength) {
      return
    }
    dispatch(getPosts(posts.length))
  }
  return (
    <div className="App">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {loading ? (
        <Waypoint onEnter={() => WaypointStop()} />
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  )
}

export default PostList
