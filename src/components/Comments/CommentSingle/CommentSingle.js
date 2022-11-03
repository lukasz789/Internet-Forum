import React, { useContext } from 'react'

import { AppContext } from '../../../context/app-context'

import axios from 'axios'

import Block from '../../UI/Block/Block'
import ActionButton from '../../UI/ActionButton/ActionButton'

import classes from './CommentSingle.module.css'

const CommentSingle = (props) => {
  const { username, token, displayAlertPopup, logoutUser } =
    useContext(AppContext)

  const upvotersCount = props.upvoters.length

  const upvoteCommentHandler = async () => {
    props.setScrollPostion(window.pageYOffset)
    try {
      const url = `https://friendly-forum.adaptable.app/api/posts/${props.createdIn}/comments/${props.id}`
      await axios({
        method: 'patch',
        url: url,
        headers: { Authorization: `Bearer ${token}` },
      })
      props.triggerRefetch()
      displayAlertPopup('Comment has been upvoted', 'success')
    } catch (error) {
      if (error.response.status === 401) {
        displayAlertPopup('Please login or register', 'error')
        logoutUser()
        return
      }
      if (error.response.data.msg === 'Comment already upvoted') {
        displayAlertPopup(error.response.data.msg, 'error')
        return
      }
      if (error.response.data.msg === 'You cant upvote Your own comment') {
        displayAlertPopup(error.response.data.msg, 'error')
        return
      }
      displayAlertPopup('Something went wrong, please try again later', 'error')
    }
  }

  const deleteCommentHandler = async () => {
    props.setScrollPostion(window.pageYOffset)
    try {
      const url = `https://friendly-forum.adaptable.app/api/posts/${props.createdIn}/comments/${props.id}`
      await axios({
        method: 'delete',
        url: url,
        headers: { Authorization: `Bearer ${token}` },
      })
      props.triggerRefetch()
      displayAlertPopup('Comment has been deleted', 'success')
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
      <div className={classes.commentPanel}>
        <div className={classes.upvoteWrapper}>
          <div className={classes.numberOfUpvotes}>{upvotersCount}+</div>
          {props.isPostOpened && username ? (
            <div className={classes.upvoteBtn} onClick={upvoteCommentHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
                fill='currentColor'
                viewBox='0 0 16 16'
                className={`bi bi-arrow-up-circle-fill ${classes.svgUpvote}`}
              >
                <path d='M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z' />
              </svg>
            </div>
          ) : null}
        </div>
        {username === props.authorName ? (
          <ActionButton text='DELETE' onClick={deleteCommentHandler} />
        ) : null}
      </div>
      <Block className={classes.commentBlock}>
        <h3>By author {props.authorName}</h3>
        <p>{props.content}</p>
      </Block>
    </div>
  )
}

export default CommentSingle
