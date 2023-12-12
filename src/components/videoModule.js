import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import useOnScreen from '../utils/useOnScreen'
import { IoMdPause } from 'react-icons/io'
import {
  IoPlayCircleOutline,
  IoVolumeMuteSharp,
  IoVolumeHighSharp,
} from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

const VideoModule = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [userInteraction, setUserInteraction] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    if (isOnScreen && !userInteraction) {
      setIsPlaying(true)
    }
  }, [isOnScreen])

  return (
    <div
      className={`video-module-container ${
        content.fullBleed ? '' : 'normal-margin'
      }`}
    >
      <div className='video-module' ref={elementRef}>
        <ReactPlayer
          url={content.videoLink}
          width={'100%'}
          height={'100%'}
          className='module-video-player'
          controls={false}
          playing={isPlaying}
          playsinline
          loop
          muted={isMuted}
          volume={1}
          onPause={() => setIsPlaying(false)}
        ></ReactPlayer>
        {isPlaying && (
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPlaying(false)
                setUserInteraction(true)
              }}
            >
              <IoMdPause className='video-module-control video-module-pause'></IoMdPause>
            </motion.button>
          </AnimatePresence>
        )}
        {!isPlaying && (
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPlaying(true)
              }}
            >
              <IoPlayCircleOutline className='video-module-control video-module-play'></IoPlayCircleOutline>
            </motion.button>
          </AnimatePresence>
        )}
        {isMuted && (
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsMuted(false)
              }}
            >
              <IoVolumeHighSharp className='video-module-control video-module-volume'></IoVolumeHighSharp>
            </motion.button>
          </AnimatePresence>
        )}
        {!isMuted && (
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsMuted(true)
              }}
            >
              <IoVolumeMuteSharp className='video-module-control video-module-volume'></IoVolumeMuteSharp>
            </motion.button>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default VideoModule
