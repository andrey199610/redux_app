import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import DndUpdateFiles from './PagePost/DndUpdateFile'

export default function Profile() {
  const { currentuser } = useSelector((state) => state.signup)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
        flexDirection: 'column',
      }}
    >
      <h1>Profile</h1>
      <div
        style={{
          fontSize: '20px',
        }}
      >
        <DndUpdateFiles id={currentuser?._id} />
        <img
          alt=""
          style={{ width: '300px', height: '300px' }}
          src={`https://nodejs-test-api-blog.herokuapp.com${currentuser?.avatar}`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://via.placeholder.com/500x300`
          }}
        />
        <div>Name:{currentuser?.name}</div>
        <div>Email:{currentuser?.email}</div>
        <div>
          DataRegister:{moment(currentuser?.dateCreated).format('MMMM Do YYYY')}
        </div>
      </div>
    </div>
  )
}
