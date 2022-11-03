import React from 'react'

// components
import Authenticate from '../components/Authorization/Authenticate'

// layout
import MainLayout from '../layouts/MainLayout'

const AuthenticatePage = (props) => {
  return (
    <MainLayout>
      <Authenticate />
    </MainLayout>
  )
}

export default AuthenticatePage
