import React from 'react';

const Image = ({src, ...rest}) => {
    src = src && src.includes("https://")
        ? src
        : "http://localhost:5000/uploads/" + src;
  return (
    <img src={src} {...rest} alt={""} />
  )
}

export default Image