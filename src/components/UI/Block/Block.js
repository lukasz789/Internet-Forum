import React from 'react'

import classes from './Block.module.css'

const Block = (props) => {
  return (
    <div className={`${props.className} ${classes.block} `}>
      {props.children}
    </div>
  )
}

export default Block
