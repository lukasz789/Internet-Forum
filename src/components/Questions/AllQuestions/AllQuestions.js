import React, { useEffect, useContext } from 'react'

import { AppContext } from '../../../context/app-context'

import ReactPaginate from 'react-paginate'

import QuestionListElement from '../QuestionListElement/QuestionListElement'
import SearchForm from '../SearchForm/SearchForm'

import Spinner from '../../UI/LoadingSpinner/LoadingSpinner'
import classes from './AllQuestions.module.css'

const AllQuestions = (props) => {
  const {
    getAllQuestions,
    questions,
    isLoading,
    numOfPages,
    page,
    search,
    sort,
    searchAuthor,
    isOpened,
    changePage,
    username,
  } = useContext(AppContext)

  useEffect(() => {
    getAllQuestions()
  }, [page, search, sort, searchAuthor, isOpened])

  const handlePageClick = (data) => {
    changePage(data.selected + 1)
  }

  return (
    <>
      {isLoading && <Spinner />}
      <SearchForm />
      {questions.length === 0 ? (
        <h2 className={classes.noneFound}>No questions found...</h2>
      ) : (
        <ul className={classes.questionsList}>
          {questions.map((question) => {
            return (
              <QuestionListElement
                key={question._id}
                title={question.title}
                authorName={question.authorName}
                content={question.content}
                createdAt={question.createdAt}
                _id={question._id}
                isLoggedUserAuthor={question.authorName === username}
              />
            )
          })}
          {numOfPages > 1 && (
            <div className={classes.paginationWrapper}>
              <ReactPaginate
                pageCount={numOfPages}
                nextLabel={'>'}
                previousLabel={'<'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                onPageChange={handlePageClick}
                currentPage={page}
              />
            </div>
          )}
        </ul>
      )}
    </>
  )
}

export default AllQuestions
