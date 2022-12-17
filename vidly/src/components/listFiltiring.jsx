import React, { Component } from "react";
import _ from "lodash";

const ListGenre = (props) => {
  const { movies,onItemSelect,items,selectedItem } = props;
  const getAllGenre = () => {
    let genres = [];
    movies.forEach((movie) => {
      if (!genres.includes(movie.genre.name)) {
        genres.push(movie.genre.name);
      }
    });
    return genres;
  };
  return (
    <React.Fragment>
      <ul className="list-group">
        <li onClick={()=>onItemSelect(null)} className={ !selectedItem ? "list-group-item active":"list-group-item"}>
          All Movies
        </li>
       {items.map((item)=>(
        <li onClick={() => onItemSelect(item)} key ={item.id} className={item === selectedItem ? "list-group-item active":"list-group-item"}
        >{item.name}</li>
       ))}
      </ul>
    </React.Fragment>
  );
};
  
export default ListGenre;
