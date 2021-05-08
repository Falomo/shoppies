import React, { useState } from "react";
import debounce from "lodash/debounce";

import { Card, TextField, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { BASE_OMDB_API_URL } from '../App';

export default function SearchMovie(props) {
  const [inputValue, setInputValue] = useState("");

  const loadData = debounce((value) => {
    const apiUrl = `${BASE_OMDB_API_URL}&s=${value}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True")
          props.onMovieListLoaded && props.onMovieListLoaded(data);
      });
  }, 500);

  const handleSearch = (value) => {
  
    setInputValue(value);
  
    props.onSearchChange && props.onSearchChange(value);
  
    if (value) loadData(value, props);
  };


  return (
    <div>
      <Card title="Movie Title" sectioned>
        <TextField
          onChange={(e) => handleSearch(e, props, setInputValue)}
          label="Search Movie"
          value={inputValue}
          prefix={<Icon source={SearchMinor} color="inkLighter" />}
          placeholder="Enter movie name e.g Rambo"
        />

      </Card>
    </div>
  );
}
