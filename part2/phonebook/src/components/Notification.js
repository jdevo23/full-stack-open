const Notification = ({ notification: { error, message } }) => {
  if (message === null) {
    return null
  }


  return (
    <div className={`${error ? "error" : "success"} notification`}>
      {message}
    </div>
  )
};

export default Notification;
