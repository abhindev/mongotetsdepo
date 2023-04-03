import React from 'react'

function test() {
    const text = "line1 \nline2";
  return (
    <div>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export default test
