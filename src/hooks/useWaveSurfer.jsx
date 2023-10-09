import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
const { useState, useEffect } = require("react");

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);


  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      barHeight: 0.6,
      normalize: false,
      container: containerRef.current,
    });

    const wsRegions = ws.registerPlugin(RegionsPlugin.create());
    const random = (min, max) => Math.random() * (max - min) + min;
    const randomColor = () =>
      `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

    let loop = true;

    wsRegions.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
    });

    wsRegions.on("region-updated", (region) => {
      console.log("Updated region", region);
    });

    {
      let activeRegion = null;
      wsRegions.on("region-in", (region) => {
        activeRegion = region;
      });
      wsRegions.on("region-out", (region) => {
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
        console.log(region)
        console.log(ws)

        //region.play();
        region.setOptions({ color: randomColor() });
      });
      // Reset the active region when the user clicks anywhere in the waveform
      ws.on("interaction", () => {
        activeRegion = null;
      });
    }

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

export default useWavesurfer;
