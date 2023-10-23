import React, { useState } from 'react'
import ReactPlayer from 'react-player'

const VideoModule = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div
      className={`video-module-container ${
        content.fullBleed ? '' : 'normal-margin'
      }`}
    >
      <div className='video-module'>
        <ReactPlayer
          url={content.videoLink}
          width={'100%'}
          height={'100%'}
          className='module-video-player'
          controls
          playing={isPlaying}
          onEnded={() => setIsPlaying(false)}
        ></ReactPlayer>
      </div>
    </div>
  )
}

export default VideoModule
