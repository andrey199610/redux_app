import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deletePost, deletePostState } from '../../reduxToolkit/PostSlice'

import { Link } from 'react-router-dom'

import Delete from '../svg/Delete'
import Edit from '../svg/Edit'
import Favorite from '../svg/Favorite'

const Post = ({ post, btnSetItemLocalstore, favoritePost }) => {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state.signup)
  const getUserLocal = JSON.parse(localStorage.getItem('currentuser'))

  const postdelete = (id) => {
    if (window.confirm('Delete post?')) {
      dispatch(deletePost(id))
      dispatch(deletePostState(id))
    }
  }

  useEffect(() => {
    setUser(getUserLocal)
  }, [])

  return (
    <div
      style={{
        border: '1px solid',
        width: '70%',
        margin: 'auto',
        marginBottom: '10px',
        marginTop: '10px',
        maxHeight: '180px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ maxWidth: '80%' }}>
        <h1 style={{ wordWrap: 'break-word' }}>{post.title}</h1>
        <div>{post.description}</div>
        <Link to={`/Posts/${post._id}`} style={{ textDecoration: 'none' }}>
          <span>Read more</span>
        </Link>
      </div>
      <div>
        {auth && post?.postedBy === user?._id ? (
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              marginTop: '5px',
            }}
          >
            <div onClick={() => postdelete(post._id)}>
              <Delete />
            </div>
            <Link to={`/editPost/${post._id}`}>
              <Edit />
            </Link>
          </div>
        ) : null}
        <div onClick={() => btnSetItemLocalstore(post)}>
          {!favoritePost.find((isfav) => isfav._id === post._id) ? (
            <Favorite fill={'#949494'} />
          ) : (
            <Favorite fill={'#384048'} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
