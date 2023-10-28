import React, { useMemo, useState } from "react";
import "./Song.scss";
import WaveSurfer from "./WaveSurfer";
import { useMetronome } from "../../class/Metronome";
import audioBufferToWav from "audiobuffer-to-wav";

function SongEditor(props) {
  const [title, setTitle] = useState("Nombre");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(240);
  const [bpm, setBPM] = useState(80);
  const metronome = useMetronome(80, 800);

  const waveFormComponent = useMemo(() => {
    return (
      <WaveSurfer
        cursorWidth="2"
        cursorColor="white"
        height={200}
        normalize="false"
        waveColor="white"
        progressColor="white"
        autoScroll="true"
        autoCenter="true"
        url={url}
        onPlay={() => {
          metronome.play();
        }}
        onPause={() => {
          metronome.pause();
        }}
      />
    );
  }, [url, metronome]);

  const onSubmit = () => {};

  const trim = (
    audioContext,
    audioBuffer,
    startTime = 0.0,
    endTime = 240.0
  ) => {
    // Calculate start and end times in samples
    const startSample = Math.floor(startTime * audioBuffer.sampleRate);
    const endSample = Math.floor(endTime * audioBuffer.sampleRate);

    // Trim the audio buffer
    const trimmedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      endSample - startSample,
      audioBuffer.sampleRate
    );

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const sourceData = audioBuffer
        .getChannelData(channel)
        .subarray(startSample, endSample);
      trimmedBuffer.copyToChannel(sourceData, channel);
    }

    return trimmedBuffer;
  };

  const handleFileUpload = async (ev) => {
    const fileInput = ev.target;
    const file = fileInput.files[0];
    await handleReadFile(file);
    setFile(file);
  };

  const renderInput = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className="area">
          <label
            className="h-100 pe-auto d-flex justify-content-center align-items-center text-white cursor-pointer"
            onDrop={(ev) => {
              ev.preventDefault();
              console.log(ev.dataTransfer.files[0]);
            }}
            onDragEnter={(ev) => {
              ev.preventDefault();
              console.log(ev);
            }}
            onDragOver={(ev) => {
              ev.preventDefault();
            }}
            onDragLeave={(ev) => {
              ev.preventDefault();
              console.log(ev);
            }}
            htmlFor="upload"
          >
            {" "}
            <span className="d-flex gap-3 align-items-center">
              <span className="fab bg-primary">
                <span className="fa fa-plus"></span>
              </span>
              CARGAR AUDIO
            </span>
            <input
              onInput={handleFileUpload}
              type="file"
              accept="audio/*"
              id="upload"
            />
          </label>
        </div>
      </form>
    );
  };

  const onChangeStartTime = async (ev) => {
    console.log(ev.target.value);
    setStartTime(ev.target.value);
    await handleReadFile(file, ev.target.value, endTime);
  };

  const onChangeEndTime = async (ev) => {
    setEndTime(ev.target.value);
    await handleReadFile(file, startTime, ev.target.value);
  };

  const handleReadFile = async (file, startTime, endTime) => {
    if (file) {
      const bufferReader = new FileReader();

      bufferReader.onload = async function (e) {
        try {
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const arrayBuffer = e.target.result;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          // Manipulate the audio
          const trimmedBuffer = trim(
            audioContext,
            audioBuffer,
            startTime,
            endTime
          );

          const wavBuffer = audioBufferToWav(trimmedBuffer);
          const blob = new Blob([wavBuffer], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);

          // Set the trimmed audio buffer to the audio element
          setUrl(url);
        } catch (error) {
          console.error("Error decoding audio data:", error);
        }
      };
      bufferReader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="w-100">
      <div className="mb-3">
        <input
          onInput={(ev) => setTitle(ev.target.value)}
          value={title}
          type="text"
          className="form-control"
          id="song-name"
          placeholder="Nombre de la canción"
        />
      </div>

      {!file ? renderInput() : waveFormComponent}
      <input
        value={startTime}
        type="number"
        step="0.01"
        min="0"
        max="240"
        onChange={onChangeStartTime}
      />
      <input
        value={endTime}
        type="number"
        step="0.01"
        min="0"
        max="240"
        onChange={onChangeEndTime}
      />
      <input
        onChange={(ev) => {
          ev.preventDefault();
          setBPM(ev.target.value);
          metronome.setBPM(ev.target.value);
        }}
        value={bpm}
        type="number"
        name="bpm"
        id="bpm"
        min="30"
        max="300"
      />
    </div>
  );
}

export default SongEditor;
