import React from 'react'

import { Link } from 'react-router-dom'

import Block from '../../UI/Block/Block'

import moment from 'moment'

import classes from './QuestionListElement.module.css'

const QuestionListElement = (props) => {
  let date = moment(props.createdAt)
  date = date.format('Do MMM YYYY')

  return (
    <li className={classes.listElement}>
      <Link
        to={`/post/${props._id}`}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <Block className={classes.questionWrapper}>
          {props.isLoggedUserAuthor ? (
            <h2>
              <span className={classes.authorQuestion}>Your question</span>
            </h2>
          ) : (
            ''
          )}
          <h2>{props.title}</h2>
          <h3>By {props.authorName} </h3>
          <h4>{date}</h4>
          <p>{props.content}</p>
        </Block>
      </Link>
    </li>
  )
}

export default QuestionListElement
