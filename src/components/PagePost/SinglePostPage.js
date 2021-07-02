import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePost } from '../../reduxToolkit/singlePostSlice'

const SinglePostPage = ({ match }) => {
  const dispatch = useDispatch()
  const post = useSelector((state) => state.post.post)
  const likes = useSelector((state) => state.post.post.likes)
  const { postId } = match.params

  useEffect(() => {
    dispatch(getSinglePost(postId))
  }, [])

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div>
        <img
          style={{ width: '100%', marginTop: '20px' }}
          src={
            !post.image ? `https://via.placeholder.com/1000x500` : post.image
          }
          alt="Card image"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://via.placeholder.com/1000x500`
          }}
        />
      </div>
      <h1>{post.title}</h1>
      <div>{post.fullText}</div>
      <h5>{post.dateCreated}</h5>
      <div>{likes ? likes.length : 0} likes </div>
    </div>
  )
}

export default SinglePostPage
