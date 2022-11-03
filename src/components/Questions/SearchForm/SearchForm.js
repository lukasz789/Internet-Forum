import React, { useContext, useState } from 'react'

import { AppContext } from '../../../context/app-context'

import AddNewQuestion from '../AddNewQuestion/AddNewQuestion'

import classes from './SearchForm.module.css'

const SearchForm = () => {
  const { handleChange, search, searchAuthor, sort, isOpened } =
    useContext(AppContext)

  const [searchInput, setSearchInput] = useState(search)
  const [authorInput, setAuthorInput] = useState(searchAuthor)
  const [sorting, setSorting] = useState(sort)
  const [searchScope, setSearchScope] = useState(isOpened)

  const submitHandler = (e) => {
    e.preventDefault()
    handleChange({ name: 'search', value: searchInput })
    handleChange({ name: 'searchAuthor', value: authorInput })
    handleChange({ name: 'sort', value: sorting })
    handleChange({ name: 'isOpened', value: searchScope })
  }

  return (
    <>
      <div className={classes.formWrapper}>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder='Find by title/content'
              className='form-control'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder='Find by author'
              className='form-control'
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <select
              className='form-select'
              onChange={(e) => setSorting(e.target.value)}
              value={sorting}
            >
              <option value='latest'>Latest</option>
              <option value='oldest'>Oldest</option>
            </select>
          </div>

          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='isOpenTickbox'
              onChange={() =>
                setSearchScope((prevState) =>
                  prevState === 'true' ? '' : 'true'
                )
              }
              checked={searchScope === '' ? true : false}
            />
            <label className='form-check-label' htmlFor='isOpenTickbox'>
              Search in closed posts
            </label>
          </div>

          <div className={classes.btnWrapper}>
            <button type='submit' className='btn btn-primary'>
              Search
            </button>
          </div>
        </form>
      </div>
      <AddNewQuestion />
    </>
  )
}

export default SearchForm
