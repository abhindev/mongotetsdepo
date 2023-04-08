import React from 'react'
import getLoggedIn from "../components/hooks/getLoggedIn.js"
function text() {
  const value = getLoggedIn();

  console.log(value)
  return (
    <div>
      hay
    </div>
  )
}

export default text
