import React, { useContext, useEffect } from 'react'

import { AppContext } from '../../../context/app-context'

import classes from './AlertPopup.module.css'

const AlertPopup = () => {
  const { alertPopupType, alertPopupMessage, alertPopupShow, clearAlertPopup } =
    useContext(AppContext)

  let wrapperStyling = alertPopupShow
    ? classes.alertPopupWrapper
    : classes.hidePopup

  let popupStyling = alertPopupShow ? classes.popup : classes.popupDisabled

  let alertTypeStyling =
    alertPopupType === 'success' ? 'alert-success' : 'alert-danger'

  useEffect(() => {
    if (alertPopupShow) {
      setTimeout(() => {
        clearAlertPopup()
      }, 2000)
    }
  }, [alertPopupShow])

  return (
    <div className={wrapperStyling}>
      <div className={`${popupStyling} alert ${alertTypeStyling}`} role='alert'>
        {alertPopupMessage}
      </div>
    </div>
  )
}

export default AlertPopup
