import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../context/app-context'

import { useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Block from '../../UI/Block/Block'
import Notification from '../../Notification/Notification'
import Spinner from '../../UI/LoadingSpinner/LoadingSpinner'

import classes from './NewQuestionForm.module.css'

const NewQuestionForm = (props) => {
  const nav = useNavigate()

  const location = useLocation()
  const title = new URLSearchParams(location.search).get('title')
  const id = new URLSearchParams(location.search).get('id')
  const content = new URLSearchParams(location.search).get('content')

  const [titleEdit, setTitleEdit] = useState(title)
  const [contentEdit, setContentEdit] = useState(content)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)

  const {
    isLoading,
    showNotification,
    questionTitle,
    questionContent,
    handleChange,
    displayFillFullFormNotification,
    displayTooShortInputsNotification,
    clearNotification,
    addQuestion,
    token,
    displayAlertPopup,
    logoutUser,
  } = useContext(AppContext)

  useEffect(() => {
    clearNotification()
  }, [])

  const submitHandlerAdd = async (e) => {
    e.preventDefault()
    if (!questionTitle || !questionContent) {
      displayFillFullFormNotification()
      return
    }
    if (questionTitle.length < 6 || questionContent.length < 6) {
      displayTooShortInputsNotification()
      return
    }
    await addQuestion()
    nav('/')
  }

  const titleChangeHandler = (e) => {
    if (id) {
      setTitleEdit(e.target.value)
    } else {
      handleChange({ name: 'questionTitle', value: e.target.value })
    }
  }
  const contentChangeHandler = (e) => {
    if (id) {
      setContentEdit(e.target.value)
    } else {
      handleChange({ name: 'questionContent', value: e.target.value })
    }
  }

  const submitHandlerEdit = async (e) => {
    e.preventDefault()
    if (!titleEdit || !contentEdit) {
      displayFillFullFormNotification()
      return
    }
    if (titleEdit.length < 6 || titleEdit.length < 6) {
      displayTooShortInputsNotification()
      return
    }

    setIsLoadingEdit(true)
    const url = `https://friendly-forum.adaptable.app/api/posts/${id}`

    try {
      const res = await axios({
        method: 'patch',
        url: url,
        data: { content: contentEdit, title: titleEdit },
        headers: { Authorization: `Bearer ${token}` },
      })
      setIsLoadingEdit(false)
      nav('/')
      displayAlertPopup('Question has been edited', 'success')
    } catch (error) {
      nav('/')
      setIsLoadingEdit(false)
      if (error.response.status === 401) {
        displayAlertPopup('Please login or register', 'error')
        logoutUser()
        return
      }
      displayAlertPopup(
        'Something went wrong, please try again later',
        'error'
      )
    }
  }

  return (
    <>
      {(isLoading || isLoadingEdit) && <Spinner />}
      <div className={classes.formWrapper}>
        <Block>
          <form
            className={classes.form}
            onSubmit={id ? submitHandlerEdit : submitHandlerAdd}
          >
            <h3 className={classes.caption}>
              {id ? 'Edit question' : 'Add new question'}
            </h3>
            <div className={classes.titleWrapper}>
              <input
                id='title'
                type='text'
                name='title'
                value={id ? titleEdit : questionTitle}
                onChange={titleChangeHandler}
                className='form-control'
                placeholder='Title'
              />
            </div>

            <div>
              <textarea
                id='content'
                type='text'
                name='content'
                value={id ? contentEdit : questionContent}
                onChange={contentChangeHandler}
                className='form-control'
                placeholder='Content'
              />
            </div>

            {showNotification && <Notification />}
            <div className={classes.btnWrapper}>
              <button
                type='submit'
                disabled={isLoading}
                className='btn btn-primary'
              >
                {id ? 'Edit' : 'Add'}
              </button>
            </div>
          </form>
        </Block>
      </div>
    </>
  )
}

export default NewQuestionForm
