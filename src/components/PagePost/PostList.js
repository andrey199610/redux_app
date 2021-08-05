import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../reduxToolkit/PostSlice'

import Post from './Post'
import { Waypoint } from 'react-waypoint'
import Circle from '../svg/Circle'
import { Link } from 'react-router-dom'

function PostList() {
  const initstate = JSON.parse(localStorage.getItem('Favorite') || '[]')
  const [favoritePost, setFavoritePost] = useState(initstate)
  const dispatch = useDispatch()

  const { loading, error, prevPostLength, posts } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts(posts.length))
    }
  }, [posts.length])

  useEffect(() => {
    localStorage.setItem('Favorite', JSON.stringify(favoritePost))
  }, [favoritePost])

  const btnSetItemLocalstore = (post) => {
    const id = post._id
    if (!favoritePost.find((fav) => fav._id === id)) {
      favoritePost.push(post)
    } else {
      return svgDeleteBtn(id)
    }
    setFavoritePost([...favoritePost])
  }

  const svgDeleteBtn = (id) => {
    const newarr = favoritePost.filter((del) => del._id !== id)
    setFavoritePost([...newarr])
  }

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
      <div
        style={{
          maxWidth: '70%',
          marginTop: '20px',
          margin: 'auto',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>My Favorite Post</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {favoritePost.map((favorite) => (
            <div
              style={{
                marginLeft: '5px',
                padding: '4px 6px 4px 6px',
                backgroundColor: '#acafb2',
                marginBottom: '5px',
                borderRadius: '3px',
                display: ' flex',
                alignItems: 'center',
              }}
              key={favorite._id}
            >
              <div>
                <Link
                  to={'/Posts/' + favorite._id}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {favorite.title}
                </Link>
              </div>
              <div
                onClick={() => svgDeleteBtn(favorite._id)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Circle />
              </div>
            </div>
          ))}
        </div>
      </div>
      {posts.map((post) => (
        <Post
          post={post}
          key={post._id}
          btnSetItemLocalstore={btnSetItemLocalstore}
          favoritePost={favoritePost}
        />
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
