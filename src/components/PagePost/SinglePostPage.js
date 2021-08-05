import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Like from '../svg/Like'
import moment from 'moment'
import axios from '../../plugins/axios'

import { getSinglePost } from '../../reduxToolkit/singlePostSlice'
import {
  likePostState,
  unlikePostState,
} from '../../reduxToolkit/singlePostSlice'

const SinglePostPage = ({ match }) => {
  const dispatch = useDispatch()
  const { post, loading, error } = useSelector((state) => state.post)
  const likes = useSelector((state) => state.post.post.likes)
  const currentuserId = useSelector((state) => state?.signup?.currentuser?._id)
  const [fill, setFill] = useState('')
  const { auth } = useSelector((state) => state.signup)
  const { postId } = match.params

  const btnLikesAndUnlikes = () => {
    const color = likes?.includes(currentuserId) ? '#949494' : '#D7443E'
    const func = likes?.includes(currentuserId)
      ? unlikePostState
      : likePostState
    dispatch(func(currentuserId))
    setFill(color)
  }

  const LikePost = async (id) => {
    if (auth) {
      btnLikesAndUnlikes()
      const like = await axios.put(`/posts/like/${id}`)
      return like.data
    }
  }
  useEffect(() => {
    dispatch(getSinglePost(postId))
  }, [])

  useEffect(() => {
    const color = likes?.includes(currentuserId) ? '#D7443E' : '#949494'
    setFill(color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes?.length, auth])

  if (error) {
    return <h1>{error}</h1>
  }

  if (!loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div>
        <img
          alt=""
          style={{ width: '100%', marginTop: '20px' }}
          src={
            !post?.image ? `https://via.placeholder.com/1000x500` : post?.image
          }
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://via.placeholder.com/1000x500`
          }}
        />
      </div>
      <h1>{post?.title}</h1>
      <div>{post?.fullText}</div>
      <h5>{moment(post?.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}</h5>
      <div onClick={() => LikePost(postId)}>
        <Like fill={fill} />
        <span style={{ marginLeft: '5px' }}>{likes?.length} likes </span>
      </div>
    </div>
  )
}

export default SinglePostPage
