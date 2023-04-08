// pages/index.js

import React, { useEffect ,useState } from 'react';

const getLoggedIn = () => {
  const [value ,setValue] = useState()
  useEffect(() => {
    // Function to check if a cookie has a value
    const checkCookieValue = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
          const cookieValue = cookie.substring(name.length + 1);
          return cookieValue !== '' && cookieValue !== null;
        }
      }
      return false;
    };

    // Check if the "loggedin" cookie has a value
    const hasLoggedInValue = checkCookieValue('loggedin');
    // console.log(hasLoggedInValue);
    setValue(hasLoggedInValue)
  }, []);

  console.log(value)

  return value
};

export default getLoggedIn;
