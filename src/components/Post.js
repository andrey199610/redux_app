import React from 'react'

const Post = ({ post }) => {
  return (
    <div
      style={{
        border: '1px solid',
        width: '70%',
        margin: 'auto',
        marginBottom: '10px',
        marginTop: '10px',
        height: '130px',
      }}
    >
      <h1 style={{ maxWidth: '90%' }}>{post.title}</h1>
      <div>{post.description}</div>
    </div>
  )
}

export default Post
