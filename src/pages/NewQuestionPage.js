import React from 'react'

// components
import NewQuestionForm from '../components/Questions/NewQuestionForm/NewQuestionForm'

// layout
import MainLayout from '../layouts/MainLayout'

const NewQuestionPage = (props) => {
  return (
    <MainLayout>
      <NewQuestionForm />
    </MainLayout>
  )
}

export default NewQuestionPage
