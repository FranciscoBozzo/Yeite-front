import React, { Component } from "react";

class Home extends Component {
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
    return (
      <div className="h-full flex justify-center items-center" >
        <section className="flex flex-col justify-center items-center text-center text-white">
          Home View
        </section>
      </div>
    );
  }
}

export default Home;
