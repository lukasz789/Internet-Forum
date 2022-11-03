import classes from './LoadingSpinner.module.css'

const Spinner = () => {
  return (
    <div className={classes.backdrop}>
      <div
        className={`spinner-border text-primary ${classes.spinner}`}
        role='status'
      />
    </div>
  )
}

export default Spinner
