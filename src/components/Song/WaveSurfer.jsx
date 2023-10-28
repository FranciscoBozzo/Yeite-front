import React, { useCallback, useEffect, useRef, useState } from "react"
import PlayButton from './../shared/PlayButton'
import './WaveSurfer.scss'
import useWavesurfer from '../../hooks/useWaveSurfer'
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";

  // Create a React component that will render wavesurfer.
  // Props are wavesurfer options.
  const WaveSurferPlayer = (props) => {
    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const wavesurfer = useWavesurfer(containerRef, props)
    const [region, setRegion] = useState(null)

    // On play button click
    const onPlayClick = () => {
      if (wavesurfer.isPlaying()) {
          wavesurfer.pause();
      } else {
          const target = (region.start / region.totalDuration);
          wavesurfer.seekTo(target);
          wavesurfer.play()
      }
    };

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return      
      setIsPlaying(false);
      
      const subscriptions = [
        wavesurfer.on('play', () => {
          props.onPlay()
          setIsPlaying(true)
        }),
        wavesurfer.on('pause', () => {
          props.onPause()
          setIsPlaying(false)
        }),
      ]

      let loop = true;
      let isResizing = false;

      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

      const trimRegion = wsRegions.addRegion({
        color: "rgba(255,0,0, 0.15)",
        drag: false,
        start: 10.00,
        end: 110.00,
        resize: true
      });

      const leftHandle = trimRegion.element.querySelector('[data-resize=left]')
      leftHandle.innerHTML =
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
      
      let resizeTimer = undefined;
      const originalOnResize = trimRegion.onResize.bind(trimRegion)

      function onResize(a,b){
        originalOnResize(a,b);
        
        if (isResizing === true) {
          wavesurfer.seekTo(trimRegion[b]/ trimRegion.totalDuration)
          return;
        }

        if(resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout( () => {
          wavesurfer.zoom(15)
          isResizing = true;
        }, 1000)        
      }

      trimRegion.onResize = onResize;

      wsRegions.on("region-updated", (region) => {
        wavesurfer.zoom(1)
        clearTimeout(resizeTimer)
        isResizing = false;
        // if (activeRegion === region && wavesurfer.isPlaying()){
        //     region.play();
        // }
      });

      let activeRegion = null;
      wsRegions.on("region-in", (region) => {
        activeRegion = region;
      });

      wsRegions.on("region-out", (region) => {
        if(isResizing) return;
        if (activeRegion === region) {
          if (loop) {
            region.play();
          } else {
            activeRegion = null;
          }
        }
      });
      
      wsRegions.on("region-clicked", (region, e) => {
        e.stopPropagation(); // prevent triggering a click on the waveform
        activeRegion = region;
        //region.play();
      });

      // Reset the active region when the user clicks anywhere in the waveform
      wavesurfer.on("interaction", () => {
        activeRegion = null;
      });

      setRegion(trimRegion)

      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }, [wavesurfer])
  
    return (
      <section className="">
        <div ref={containerRef} id="waveform" className="py-1 position-relative" style={{ margin: "1rem 0px", minHeight: '100px'}}>
          <div className="rounded-2" style={{backgroundColor : "#BA53DE", height: "60%", width:"100%", position:"absolute", top:"50%", transform: "translateY(-50%)"}}></div>
        </div>
        <div className="wavesurfer-controls d-flex justify-content-end aling-items-center">
            <PlayButton playing={isPlaying} onClick={onPlayClick} style={{width: "24px", height: "24px"}} class="ratio ratio-1x1 border rounded-circle d-flex justify-content-center align-items-center">
            </PlayButton>
        </div>

      </section>
    )
  }

  export default WaveSurferPlayer;