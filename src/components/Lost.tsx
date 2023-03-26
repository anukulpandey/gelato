import React from 'react';
import YouTube from 'react-youtube';

function Lost() {
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
      <YouTube videoId="SXV10Y912hA" opts={opts} />
    </div>
  );
}

export default Lost;
