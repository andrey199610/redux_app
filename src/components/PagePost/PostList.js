import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import { Waypoint } from 'react-waypoint'
import { getPosts } from '../../reduxToolkit/PostSlice'
import axios from 'axios'

function PostList() {
  const dispatch = useDispatch()
  const { loading, error, prevPostLength, posts } = useSelector(
    (state) => state.posts
  )

  const deletePost = async (id) => {
    const response = await axios.delete(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    return response.data
  }

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts(posts.length))
    }
  }, [])

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
    <div>
      {posts.map((post) => (
        <Post post={post} key={post._id} deletePost={deletePost} />
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
