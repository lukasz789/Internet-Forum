import React, { useContext } from 'react'

import { AppContext } from '../../context/app-context'

import classes from './Notification.module.css'

const Notification = () => {
  const { notificationText } = useContext(AppContext)

  return (
    <div className={`alert alert-danger ${classes.error}`} role='alert'>
      {notificationText}
    </div>
  )
}

export default Notification
