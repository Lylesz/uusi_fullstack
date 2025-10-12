const Notification = ({ message, error }) => {
  if (!message && !error) {
    return null
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }

  return (
    <div className="viesti">
      {message}
    </div>
  )
}

export default Notification