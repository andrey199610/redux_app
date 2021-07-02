import React from 'react'

const Post = ({ post, deletePost }) => {
  return (
    <div
      style={{
        border: '1px solid',
        width: '70%',
        margin: 'auto',
        marginBottom: '10px',
        marginTop: '10px',
        height: '150px',
      }}
    >
      <h1 style={{ maxWidth: '90%', wordWrap: 'break-word' }}>{post.title}</h1>
      <div>{post.description}</div>
      <a href={'/Posts/' + post._id}>
        <span className="card_readmore">Read more</span>
      </a>
      <button onClick={() => deletePost(post._id)}>Delete</button>
    </div>
  )
}

export default Post
