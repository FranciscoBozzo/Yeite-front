import React, { useCallback, useEffect, useRef, useState } from "react"
import PlayButton from './../shared/PlayButton'
import './WaveSurfer.scss'
import useWavesurfer from '../../hooks/useWaveSurfer'

  // Create a React component that will render wavesurfer.
  // Props are wavesurfer options.
  const WaveSurferPlayer = ( props) => {
    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)

    // On play button click
    const onPlayClick = useCallback(() => {
      if (wavesurfer.isPlaying()) {
          wavesurfer.pause();
      } else {
          wavesurfer.play()
      }
    }, [wavesurfer])

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return
      
      console.log(wavesurfer)
      setCurrentTime(0)
      setIsPlaying(false)

      const cursor = wavesurfer.renderer.cursor;
      cursor.innerHTML =
      `<div class="handle" part="handle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle opacity="0.5" cx="1" cy="1" r="1" fill="black"/>
          <circle opacity="0.5" cx="5" cy="1" r="1" fill="black"/>
          <circle opacity="0.5" cx="9" cy="1" r="1" fill="black"/>
          <circle opacity="0.5" cx="5" cy="5" r="1" fill="black"/>
          <circle opacity="0.5" cx="9" cy="5" r="1" fill="black"/>
          <circle opacity="0.5" cx="5" cy="9" r="1" fill="black"/>
          <circle opacity="0.5" cx="9" cy="9" r="1" fill="black"/>
          <circle opacity="0.5" cx="1" cy="5" r="1" fill="black"/>
          <circle opacity="0.5" cx="1" cy="9" r="1" fill="black"/>
        </svg>
      </div>
      <div part="step-message-wrapper" class="step-message-wrapper">
        <div part="step-message" class="step-message">
          vamos a seguir unos pasitos
        </div>
      </div>`
      
      const subscriptions = [
        wavesurfer.on('play', () => {
          props.onPlay()
          setIsPlaying(true)
        }),
        wavesurfer.on('pause', () => {
          props.onPause()
          setIsPlaying(false)
        }),
        wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
      ]
  
      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }, [wavesurfer])
  
    return (
      <section className="">
        <div ref={containerRef} id="waveform" className="py-1 position-relative" style={{ margin: "1rem 0px", minHeight: '100px'}}>
          <div className="rounded-2" style={{backgroundColor : "#BA53DE", height: "70%", width:"100%", position:"absolute", top:"50%", transform: "translateY(-50%)"}}></div>
        </div>
        <div className="wavesurfer-controls d-flex justify-content-end aling-items-center">
            <PlayButton playing={isPlaying} onClick={onPlayClick} style={{width: "24px", height: "24px"}} class="ratio ratio-1x1 border rounded-circle d-flex justify-content-center align-items-center">
            </PlayButton>
        </div>

      </section>
    )
  }

  export default WaveSurferPlayer;