import React, { useState, useContext } from 'react'

import axios from 'axios'

import { AppContext } from '../../../context/app-context'

import Notification from '../../Notification/Notification'

import classes from './AddNewComment.module.css'

const AddNewComment = (props) => {
  const [commentContent, setCommentContent] = useState('')

  const {
    showNotification,
    displayFillFullFormNotification,
    displayTooShortInputsNotification,
    token,
    displayAlertPopup,
    logoutUser,
  } = useContext(AppContext)

  const changeCommentContentHandler = (e) => setCommentContent(e.target.value)

  const submitHandlerAddComment = async (e) => {
    e.preventDefault()
    if (!commentContent) {
      displayFillFullFormNotification()
      return
    }
    if (commentContent.length < 6) {
      displayTooShortInputsNotification()
      return
    }

    try {
      await axios({
        method: 'post',
        url: `https://friendly-forum.adaptable.app/api/posts/${props.postId}/comments`,
        data: { content: commentContent },
        headers: { Authorization: `Bearer ${token}` },
      })
      props.triggerRefetch()
      displayAlertPopup('Comment has been added', 'success')
    } catch (error) {
      if (error.response.status === 401) {
        displayAlertPopup('Please login or register', 'error')
        logoutUser()
        return
      }
      displayAlertPopup('Something went wrong, please try again later', 'error')
    }
  }

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.caption}>Add new comment</h3>
      <form onSubmit={submitHandlerAddComment}>
        <div>
          <textarea
            id='content'
            type='text'
            name='content'
            className='form-control'
            placeholder='Content'
            value={commentContent}
            onChange={changeCommentContentHandler}
          />

          <div className={classes.btnWrapper}>
            <button
              type='submit'
              disabled={props.isLoading}
              className='btn btn-primary'
            >
              Add
            </button>
          </div>
        </div>
      </form>
      {showNotification && <Notification />}
    </div>
  )
}

export default AddNewComment
