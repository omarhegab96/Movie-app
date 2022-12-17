import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { getMovie } from "../services/fakeMovieService";
import Heart from "./heart";
import Pagination from "./pagination";
import { paginate } from "../utilis/paginate";
import List from "./listFiltiring";
import ListGenre from "./listFiltiring";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres : [],
    selectedGenre: null
  };

  componentDidMount(){
    this.setState({movies:getMovies(),genres:getGenres()})
  }
  style = {
    main: {
      display: "flex",
      flexDirection: "column",
      gap: 15,
      marginLeft: 60,
    },

    styleNew: {
      display: "flex",
      flexDirection: "row",
      gap: 112,
      fontWeight: "bold",
      justifyContent: "center",
      alignItem: "center",
      width: "100%",
    },
  };

  handleDelete = (movie) => {
    let restMovies = deleteMovie(movie._id);
    this.setState({ movies: restMovies });
  };

  handleMovies() {
    let moviesLen = this.state.movies.length;
    return moviesLen === 0 ? (
      "there are no movies."
    ) : (
      <div style={this.style.styleNew}>
        showing {this.state.movies.length} movies in the database.
      </div>
    );
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  handleGenre = (genre) => {  
    this.setState({selectedGenre:genre})
  }

  render() {
    const filtered = this.state.selectedGenre ? this.state.movies.filter(m=>m.genre.name === this.state.selectedGenre.name) : this.state.movies
     const movies = paginate(filtered, this.state.currentPage, this.state.pageSize);
    return (
      <React.Fragment>
        <div style={{marginTop: '20px'}} className="container">
          <div className="row">
            <div className="col-2">
              <ListGenre
                selectedItem={this.state.selectedGenre}
                items = {this.state.genres}
                onItemSelect = {this.handleGenre}
                movies = {this.state.movies}
              ></ListGenre>
            </div>  
            <div className="col">
              <div style={this.style.styleNew}>{this.handleMovies()}</div>
              <table className="table">
                {this.state.movies.length > 0 && (
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Genre</th>
                      <th>Stock</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Heart />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-secondary bg-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             <Pagination
                pageSize={this.state.pageSize}
                itemsCount={filtered.length}
                onPageChange={this.handlePageChange}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
