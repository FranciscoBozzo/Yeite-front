import React, { useMemo, useRef, useState } from "react";
import "./Song.scss";
import WaveSurfer from "./WaveSurfer";
import { useMetronome } from "../../class/Metronome";

function SongEditor(props) {
  const [title, setTitle] = useState("Nombre");
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBPM] = useState(80);
  const metronome = useMetronome(80, 800)

  const waveFormComponent = useMemo(() => {
    return (
      <WaveSurfer
        cursorWidth="2"
        cursorColor="white"
        height={200}
        normalize="false"
        waveColor="white"
        progressColor="#7c5d86"
        url = {file}
        onPlay={() => {metronome.play()}}
        onPause={() => {metronome.pause()}}
      />)
  }, [file]);

  const onSubmit = () => {};

  const handleFileUpload = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    
    const audio = new Audio();
    audio.controls = true;
    document.body.appendChild(audio)

    reader.onload = function (evt) {
      const url = evt.target.result;
      setFile(url)
    };

    reader.readAsDataURL(file);
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

      { 
        !file ? renderInput() : waveFormComponent
      }
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
