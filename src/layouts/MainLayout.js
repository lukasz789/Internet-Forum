import React from 'react'

// components
import Header from '../components/Header/Header'
import AlertPopup from '../components/UI/AlertPopup/AlertPopup'

import classes from './MainLayout.module.css'

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <AlertPopup />
      <div className={classes.childrenWrapper}>{props.children}</div>
    </>
  )
}

export default MainLayout
