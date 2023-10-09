import React, { Component } from "react";
import "./Song.scss";

class SongAdmin extends Component {
  state = {
    data: { title: "", genreId: "", dailyRentalRate: "", numberInStock: "" },
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="h-full flex justify-center items-center" >
        <section className="flex flex-col justify-center items-center text-center text-white">
          <span style={{"fontSize":"96px"}}>🥲</span>
          <div className="text-lg font-bold">No tenés ninguna canción</div>
          <div className="text-base">O quizás si, pero no está cargada acá</div>
        </section>
      </div>
    );
  }
}

export default SongAdmin;
