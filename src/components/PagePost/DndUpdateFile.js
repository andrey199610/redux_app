import React, { useState } from 'react'
import axios from '../../plugins/axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../reduxToolkit/SignUpSlice'

function DndUpdateFiles({ id }) {
  const [drag, setDrag] = useState(false)
  const dispatch = useDispatch()
  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = async (e) => {
    e.preventDefault()
    let files = [...e.dataTransfer.files]
    const formData = new FormData()
    formData.append('avatar', files[0])
    await axios.put(`/users/upload/${id}`, formData)

    const user = await axios.get(`/auth/user`)
    dispatch(updateUser(user.data))

    setDrag(false)
  }

  return (
    <div
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => onDropHandler(e)}
    >
      {drag ? (
        <div
          style={{
            width: '200px',
            height: '200px',
            border: '1px solid',
            position: 'absolute',
          }}
        >
          Отпустите файл чтоби загрузить их
        </div>
      ) : (
        <div
          style={{
            width: '300px',
            height: '300px',
            border: '1px solid',
            position: 'absolute',
          }}
        >
          Перетащите файли
        </div>
      )}
    </div>
  )
}
export default DndUpdateFiles
