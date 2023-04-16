import React from 'react';

const dom = process.env.NEXT_PUBLIC_DOM;
const email = process.env.NEXT_PUBLIC_SHIPROCKETID;
const password = process.env.NEXT_PUBLIC_SHIPROCKETPASSWORD;

function Test() {
  return (
    <div>
      {dom}
      {email}
      {password}
    </div>
  );
}

export default Test;
