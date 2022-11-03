import React from 'react'

import CommentSingle from '../CommentSingle/CommentSingle'

import classes from './AllComments.module.css'

const AllComments = (props) => {
  return (
    <>
      <div className={classes.selectWrapper}>
        <div className={`form-group ${classes.select}`}>
          <select
            className='form-select'
            onChange={(e) => props.setCommentsSorting(e.target.value)}
            value={props.commentsSorting}
          >
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
            <option value='best'>Best</option>
          </select>
        </div>
      </div>
      <ul className={classes.commentsList}>
        {props.comments.map((comment) => {
          return (
            <CommentSingle
              key={comment._id}
              id={comment._id}
              content={comment.content}
              authorName={comment.authorName}
              upvoters={comment.upvoters}
              createdIn={comment.createdIn}
              triggerRefetch={props.triggerRefetch}
              isPostOpened={props.isPostOpened}
              setScrollPostion={props.setScrollPostion}
            />
          )
        })}
      </ul>
    </>
  )
}

export default AllComments
