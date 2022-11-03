import React from 'react'

// components
import AllQuestions from '../components/Questions/AllQuestions/AllQuestions'

// layout
import MainLayout from '../layouts/MainLayout'

const QuestionsPage = (props) => {
  return (
    <MainLayout>
      <AllQuestions />
    </MainLayout>
  )
}

export default QuestionsPage
