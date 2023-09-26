import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import "./Song.css";
import metronome from "../../class/Metronome";

import { getMovies, saveMovie } from "../../services/fakeMovieService";

class SongEditor extends Form {
  state = {
    data: { title: "", genreId: "", dailyRentalRate: "", numberInStock: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre").min(5),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .min(0)
      .max(100)
      .integer(),
    dailyRentalRate: Joi.number().label("Rate").required().min(0).max(10),
  };

  componentDidMount() {
    const match = this.urlParams;

    console.log("movie Id: " + match);

    //this.setState({ data: getMovie() });
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    console.log(getMovies());
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
          {this.renderInput("title", "Title")}
          {this.renderInput("file", "Audio", "file")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
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
