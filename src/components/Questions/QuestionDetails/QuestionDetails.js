import React, { useEffect, useState, useContext } from 'react'

import { AppContext } from '../../../context/app-context'

import axios from 'axios'

import { useParams, useNavigate, Link } from 'react-router-dom'

import AllComments from '../../Comments/AllComments/AllComments'
import AddNewComment from '../../Comments/AddNewComment/AddNewComment'

import moment from 'moment'

import Block from '../../UI/Block/Block'
import ActionButton from '../../UI/ActionButton/ActionButton'
import Spinner from '../../UI/LoadingSpinner/LoadingSpinner'

import classes from './QuestionDetails.module.css'

const initialState = {
  isLoading: true,
  isError: false,
  reloadTriggerer: false,
}

const initialStateQuestion = {
  createdAt: '',
  isPostOpened: '',
  title: '',
  author: '',
  content: '',
  isPostAuthor: false,
}

const QuestionDetails = (props) => {
  const { username, token, displayAlertPopup, logoutUser } =
    useContext(AppContext)

  const nav = useNavigate()
  const { postId } = useParams()

  const [queryState, setQueryState] = useState(initialState)
  const [questionDetails, setQuestionDetails] = useState(initialStateQuestion)
  const [comments, setComments] = useState([])
  const [commentsSorting, setCommentsSorting] = useState('latest')
  const [scrollPosition, setScrollPostion] = useState(0)

  const triggerRefetch = () => {
    setQueryState((prevState) => ({
      ...prevState,
      reloadTriggerer: !prevState.reloadTriggerer,
    }))
  }

  useEffect(() => {
    const getPost = async () => {
      setQueryState((prevState) => ({
        ...prevState,
        isLoading: true,
      }))

      try {
        const res = await axios(
          `https://friendly-forum.adaptable.app/api/posts?postId=${postId}`
        )

        setQuestionDetails((prevState) => ({
          ...prevState,
          author: res.data.post.authorName,
          createdAt: res.data.post.createdAt,
          isPostOpened: res.data.post.isOpened,
          title: res.data.post.title,
          content: res.data.post.content,
          isPostAuthor: res.data.post.authorName === username,
        }))

        setQueryState((prevState) => ({
          ...prevState,
          isLoading: false,
        }))
      } catch (error) {
        setQueryState((prevState) => ({
          ...prevState,
          isError: true,
        }))
        setQueryState((prevState) => ({
          ...prevState,
          isLoading: false,
        }))
      }
    }

    getPost()
  }, [username, queryState.reloadTriggerer, commentsSorting])

  useEffect(() => {
    const getComments = async () => {
      setQueryState((prevState) => ({
        ...prevState,
        isLoading: true,
      }))
      try {
        const res = await axios(
          `https://friendly-forum.adaptable.app/api/posts/${postId}/comments?sort=${commentsSorting}`
        )

        setComments(res.data.allCommentsForGivenPost)
        window.scrollTo(0, scrollPosition)
      } catch (error) {
        setQueryState((prevState) => ({
          ...prevState,
          isLoading: false,
        }))
        setQueryState((prevState) => ({
          ...prevState,
          isError: true,
        }))
      }
    }

    getComments()
  }, [commentsSorting, queryState.reloadTriggerer, commentsSorting])

  if (queryState.isLoading) return <Spinner />
  if (queryState.isError)
    return (
      <h1 className={classes.errorText}>
        Something went wrong, please try again later
      </h1>
    )

  let date = moment(questionDetails.createdAt)
  date = date.format('Do MMM YYYY')

  const deletePost = async () => {
    setQueryState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))
    try {
      const url = `https://friendly-forum.adaptable.app/api/posts/${postId}`
      await axios({
        method: 'delete',
        url: url,
        headers: { Authorization: `Bearer ${token}` },
      })
      setQueryState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
      displayAlertPopup('Question has been deleted', 'success')
      nav('/')
    } catch (error) {
      if (error.response.status === 401) {
        displayAlertPopup('Please login or register', 'error')
        logoutUser()
        return
      }
      displayAlertPopup('Something went wrong, please try again later', 'error')
    }
  }

  const closePost = async () => {
    setQueryState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))
    try {
      const url = `https://friendly-forum.adaptable.app/api/posts/${postId}`
      const res = await axios({
        method: 'patch',
        url: url,
        data: { isOpened: false },
        headers: { Authorization: `Bearer ${token}` },
      })

      setQuestionDetails((prevState) => ({
        ...prevState,
        isPostOpened: res.data.updatedPost.isOpened,
      }))

      setQueryState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
      displayAlertPopup('Question has been closed', 'success')
    } catch (error) {
      if (error.response.status === 401) {
        displayAlertPopup('Please login or register', 'error')
        logoutUser()
        return
      }
      displayAlertPopup('Something went wrong, please try again later', 'error')
    }
  }

  const editPost = () => {
    nav(
      `/addNewQuestion?title=${questionDetails.title}&content=${questionDetails.content}&id=${postId}`
    )
  }

  return (
    <>
      <div className={classes.wrapper}>
        <Block className={classes.blockQuestion}>
          <h2>{questionDetails.title}</h2>
          <h3>By {questionDetails.author}</h3>
          <h4>{date}</h4>
          <p>{questionDetails.content}</p>
          <div className={classes.questionActions}>
            {!questionDetails.isPostAuthor && !questionDetails.isPostOpened ? (
              <div className={classes.postClosed}>POST CLOSED BY AUTHOR</div>
            ) : null}
            {questionDetails.isPostAuthor && (
              <>
                {!questionDetails.isPostOpened ? (
                  <div className={classes.postClosed}>
                    POST CLOSED BY AUTHOR
                  </div>
                ) : (
                  <div className={classes.actionWrapper}>
                    <ActionButton text='CLOSE' onClick={closePost} />
                  </div>
                )}
                <div className={classes.actionWrapper}>
                  <ActionButton text='EDIT' onClick={editPost} />
                </div>
                <div className={classes.actionWrapper}>
                  <ActionButton text='DELETE' onClick={deletePost} />
                </div>
              </>
            )}
          </div>
        </Block>
        {questionDetails.isPostOpened ? (
          username ? (
            <AddNewComment
              isLoading={queryState.isLoading}
              postId={postId}
              triggerRefetch={triggerRefetch}
            />
          ) : (
            <div className={classes.authTextWrapper}>
              <span className={classes.unauthText}>
                To add a comment You have to{' '}
                <Link to='/authenticate'>LOGIN/REGISTER</Link> first
              </span>
            </div>
          )
        ) : null}

        <AllComments
          postId={postId}
          comments={comments}
          triggerRefetch={triggerRefetch}
          isPostOpened={questionDetails.isPostOpened}
          setScrollPostion={setScrollPostion}
          setCommentsSorting={setCommentsSorting}
          commentsSorting={commentsSorting}
        />
      </div>
    </>
  )
}

export default QuestionDetails
