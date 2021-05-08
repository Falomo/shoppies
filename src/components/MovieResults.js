import React from "react";

import { Card, Button, List } from "@shopify/polaris";

export default function MovieResults(props) {
  const { searchResult } = props;

  const getMovieList = ({ data: movies, onNominate, isDisabled }) =>
    movies.map((movie) => (
      <List.Item key={movie.imdbID}>
        {movie.Title} ({movie.Year}){" "}
        <Button
          disabled={isDisabled || movie.isDisabled}
          onClick={() => onNominate(movie)}
          variant="light"
        >
          Nominate
        </Button>
      </List.Item>
    ));
  return (
    <div>
      <Card title={`Results for "${searchResult}"`} sectioned>
        <List>{getMovieList(props)}</List>
      </Card>
    </div>
  );
}
