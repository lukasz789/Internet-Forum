import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = (props) => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to='/'>Go back to homepage</Link>
    </div>
  )
}

export default PageNotFound
