import React from 'react';
import YouTube from 'react-youtube';

function Won() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
    showBranding: false,
  };

  return (
    <div>
      <YouTube videoId="EZEfN5z8Mlg" opts={opts} />
    </div>
  );
}

export default Won;
