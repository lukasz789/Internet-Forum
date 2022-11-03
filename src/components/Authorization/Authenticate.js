import React, { useState, useContext, useEffect } from 'react'

import Notification from '../Notification/Notification'

import { AppContext } from '../../context/app-context'

import { useNavigate } from 'react-router-dom'

import Block from '../UI/Block/Block'
import Spinner from '../UI/LoadingSpinner/LoadingSpinner'
import classes from './Authenticate.module.css'

const initialState = {
  name: '',
  password: '',
  isNewUser: true,
}

const Authenticate = () => {
  const {
    displayFillFullFormNotification,
    displayTooShortInputsNotification,
    isLoading,
    loginUser,
    registerUser,
    showNotification,
    username,
    clearNotification,
  } = useContext(AppContext)

  const [authFormState, setAuthFormState] = useState(initialState)
  const nav = useNavigate()

  useEffect(() => {
    clearNotification()
  }, [])

  useEffect(() => {
    if (!username) return
    nav('/')
  }, [username, nav])

  const toggleMember = () => {
    setAuthFormState((prevState) => ({
      ...prevState,
      isNewUser: !prevState.isNewUser,
    }))
  }

  const handleChange = (e) => {
    setAuthFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, password, isNewUser } = authFormState
    if (!name || !password) {
      displayFillFullFormNotification()
      return
    }
    if (name.length < 6 || password.length < 6) {
      displayTooShortInputsNotification()
      return
    }
    const user = { username: name, password }
    if (isNewUser) {
      registerUser(user)
    } else {
      loginUser(user)
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <div className={classes.formWrapper}>
        <Block className={classes.block}>
          <form onSubmit={onSubmit} className={classes.form}>
            <h3 className={classes.caption}>
              {!authFormState.isNewUser ? 'Login' : 'Register'}
            </h3>
            <div className={classes.inputWrapper}>
              <input
                id='name'
                type='text'
                name='name'
                value={authFormState.name}
                onChange={handleChange}
                className='form-control'
                placeholder='Name'
              />
            </div>
            <div className={classes.inputWrapper}>
              <input
                id='password'
                type='password'
                name='password'
                value={authFormState.password}
                onChange={handleChange}
                className='form-control'
                placeholder='Password'
              />
            </div>
            {showNotification && <Notification />}
            <div className={classes.btnWrapper}>
              <button
                type='submit'
                disabled={isLoading}
                className='btn btn-primary'
              >
                Submit
              </button>
            </div>
            <span className={classes.bottomText}>
              {!authFormState.isNewUser
                ? 'Dont have an account yet? -> '
                : 'Do You already have an account? -> '}
              <span onClick={toggleMember} className={classes.formToggler}>
                {!authFormState.isNewUser ? 'REGISTER' : 'LOGIN'}
              </span>
            </span>
          </form>
        </Block>
      </div>
    </>
  )
}

export default Authenticate
