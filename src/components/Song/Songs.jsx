import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

import ListGroup from "../common/listGroup";

import SongsTable from "./SongsTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(this.state.p), genres });
  }

  handleDelete = (movie) => {
    console.log(movie);
    const filteredMovies = this.state.movies.filter((m) => {
      return m !== movie;
    });
    this.setState({ ...this.state, movies: filteredMovies });
  };

  handleLike = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m === movie) {
        movie.liked = !movie.liked;
      }
      return movie;
    });
    this.setState(movies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === selectedGenre._id
          )
        : this.state.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) return <h3>There are no movies in the database</h3>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <NavLink className="nav-link" to="/song/new">
            <button className="btn btn-primary">New Movie</button>
          </NavLink>

          <p>Showing {totalCount} movies in the database.</p>
          <SongsTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            moviesCount={totalCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
