import React, { Component } from "react";
import "./Song.css";
import metronome from "../../class/Metronome";

class SongEditor extends Component {
  state = {
    data: { title: "", genreId: "", dailyRentalRate: "", numberInStock: "" },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    const match = this.urlParams;

    console.log("movie Id: " + match);

    //this.setState({ data: getMovie() });
  }

  doSubmit = () => {

  };

  handleDrop = (ev) => {
    ev.preventDefault();
    console.log(ev);
  };

  render() {
    console.log(metronome);
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
         
          <div className="area">
            <label
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
              UPLOAD FILES
              <input type="file" accept="audio/*" id="upload" />
            </label>
          </div>
        </form>
        <button onClick={() => metronome.play()}>Play Metronome</button>
        <button onClick={() => metronome.pause()}>Pause</button>
        <input
          onChange={(ev) => metronome.setBPM(ev.target.value)}
          type="range"
          name="bpm"
          id="bpm"
          min="30"
          max="300"
        />
      </div>
    );
  }
}

export default SongEditor;
