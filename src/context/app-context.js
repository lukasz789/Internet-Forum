import React, { useReducer } from 'react'

import reducer from './reducer'

import {
  SHOW_FILL_FULL_FORM_NOTIFICATION,
  SHOW_TOO_SHORT_INPUTS_IN_FORM,
  REGISTER_USER_DONE,
  REGISTER_USER_ERROR,
  REGISTER_USER_START,
  LOGIN_USER_DONE,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGOUT_USER,
  GET_QUESTIONS_START,
  GET_QUESTIONS_DONE,
  HANDLE_CHANGE,
  CLEAR_ALERT,
  ADD_QUESTION_START,
  ADD_QUESTION_DONE,
  CLEAR_QUESTION_FORM,
  CHANGE_PAGE,
  TRIGGER_POPUP,
  CLEAR_POPUP,
} from './actions'

import axios from 'axios'

const initialState = {
  isLoading: false,
  notificationText: '',
  showNotification: false,
  token: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || null,
  questions: [],
  totalQuestions: 0,
  page: 1,
  numOfPages: 1,
  search: '',
  isOpened: 'true',
  searchAuthor: '',
  sort: 'latest',

  questionTitle: '',
  questionContent: '',

  alertPopupType: '',
  alertPopupMessage: '',
  alertPopupShow: false,
}

const AppContext = React.createContext()

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayFillFullFormNotification = () => {
    dispatch({ type: SHOW_FILL_FULL_FORM_NOTIFICATION })
  }

  const displayTooShortInputsNotification = () => {
    dispatch({ type: SHOW_TOO_SHORT_INPUTS_IN_FORM })
  }

  const registerUser = async (newUser) => {
    dispatch({ type: REGISTER_USER_START })
    try {
      const res = await axios({
        method: 'post',
        url: 'https://friendly-forum.adaptable.app/api/auth/register',
        data: newUser,
      })
      const { username, token } = res.data
      dispatch({ type: REGISTER_USER_DONE, payload: { username, token } })
      addUserToLocalstorage({ username, token })
      displayAlertPopup('Registered', 'success')
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
  }

  const addUserToLocalstorage = (userData) => {
    localStorage.setItem('username', userData.username)
    localStorage.setItem('token', userData.token)
  }

  const removeUserFromLocalstorage = (userData) => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  const loginUser = async (user) => {
    dispatch({ type: LOGIN_USER_START })
    try {
      const res = await axios({
        method: 'post',
        url: 'https://friendly-forum.adaptable.app/api/auth/login',
        data: user,
      })
      const { username, token } = res.data
      dispatch({ type: LOGIN_USER_DONE, payload: { username, token } })
      addUserToLocalstorage({ username, token })
      displayAlertPopup('Logged in', 'success')
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalstorage()
    dispatch({ type: CLEAR_QUESTION_FORM })
  }

  const getAllQuestions = async () => {
    let url = `https://friendly-forum.adaptable.app/api/posts?isOpened=${state.isOpened}&search=${state.search}&username=${state.searchAuthor}&sort=${state.sort}&page=${state.page}`
    dispatch({ type: GET_QUESTIONS_START })

    try {
      const res = await axios(url)
      const { allPosts, numOfPages, totalPosts } = res.data
      dispatch({
        type: GET_QUESTIONS_DONE,
        payload: {
          allPosts,
          totalPosts,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearNotification = () => {
    dispatch({ type: CLEAR_ALERT })
  }

  const addQuestion = async () => {
    dispatch({ type: ADD_QUESTION_START })

    try {
      const { questionTitle, questionContent, token } = state
      await axios({
        method: 'post',
        url: 'https://friendly-forum.adaptable.app/api/posts',
        data: { title: questionTitle, content: questionContent },
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch({ type: ADD_QUESTION_DONE })
      dispatch({ type: CLEAR_QUESTION_FORM })
      displayAlertPopup('Question has been added', 'success')
    } catch (error) {
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

  const displayAlertPopup = (message, type) => {
    dispatch({
      type: TRIGGER_POPUP,
      payload: { alertPopupMessage: message, alertPopupType: type },
    })
  }

  const clearAlertPopup = () => {
    dispatch({
      type: CLEAR_POPUP,
    })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayFillFullFormNotification,
        displayTooShortInputsNotification,
        loginUser,
        logoutUser,
        registerUser,
        getAllQuestions,
        handleChange,
        clearNotification,
        addQuestion,
        changePage,
        displayAlertPopup,
        clearAlertPopup,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
