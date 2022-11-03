import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import AuthenticatePage from './pages/AuthenticatePage'
import QuestionsPage from './pages/QuestionsPage'
import NotFoundErrorPage from './pages/NotFoundErrorPage'
import QuestionDetailsPage from './pages/QuestionDetailsPage'
import NewQuestionPage from './pages/NewQuestionPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<QuestionsPage />} />
        <Route path='/authenticate' element={<AuthenticatePage />} />
        <Route path='/post/:postId' element={<QuestionDetailsPage />} />
        <Route path='/addNewQuestion' element={<NewQuestionPage />} />
        <Route path='/*' element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
