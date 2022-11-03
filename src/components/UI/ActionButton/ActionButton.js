import React from 'react'

import classes from './ActionButton.module.css'

const ActionButton = (props) => {
  let styling = `alert`

  if (props.text === 'DELETE') styling = `alert alert-warning ${classes.delete}`
  if (props.text === 'EDIT') styling = `alert alert-warning ${classes.edit}`
  if (props.text === 'CLOSE')
    styling = `alert alert alert-success ${classes.close}`

  return (
    <div onClick={props.onClick} className={styling}>
      {props.text}
    </div>
  )
}

export default ActionButton
