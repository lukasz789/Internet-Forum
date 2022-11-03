import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import { AppContext } from '../../../context/app-context'

import classes from './AddNewQuestion.module.css'

const AddNewQuestion = () => {
  const { username } = useContext(AppContext)

  return (
    <div className={classes.adderWrapper}>
      {username ? (
        <Link to='/addNewQuestion' style={{ textDecoration: 'none' }}>
          <div className={classes.adder}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='green'
              className='bi bi-arrow-90deg-down'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z'
              />
            </svg>
            <span className={classes.text}>Add new question</span>
          </div>
        </Link>
      ) : (
        <span className={classes.unauthText}>
          To add a new question You have to{' '}
          <Link to='/authenticate'>LOGIN/REGISTER</Link> first
        </span>
      )}
    </div>
  )
}

export default AddNewQuestion
