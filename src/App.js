
import "./App.css";
import React from "react";


import SearchMovie from "./components/SearchMovie";
import MovieResults from "./components/MovieResults";
import Nominations from "./components/Nominations";
import ShareLinkModal from "./components/ShareLinkModal/ShareLinkModal";

import enTranslations from "@shopify/polaris/locales/en.json";

import {
  AppProvider,
  Page,
  Layout,
  Banner,
  Frame
} from "@shopify/polaris";

import isEqual from "lodash/isEqual";

export const BASE_OMDB_API_URL = `https://www.omdbapi.com/?apikey=22b1a044&type=movie`

class App extends React.Component {
  state = {
    searchTerm: "",
    shareableLink: window.location.href,
    movies: [],
    nominations: [],
    disableNominations: false,
    isCancelNominationBanner: false,
    isShareModalVisible: false
  };

  getMoviesByIds = (values, props) => {
    const urls = values.map(
      (value) => `${BASE_OMDB_API_URL}&i=${value}`
    );

    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .catch((err) => console.log(err))
      )
    ).then((movies) => {
      const nominations = movies.filter((movie) => movie);
      this.setState({ nominations });
    });
  };

  getMoviesFromLocalStorage = () => {
    const localStorageNominations =
      JSON.parse(localStorage.getItem("nominations")) || [];
    const disableNominations =
      JSON.parse(localStorage.getItem("disableNominations")) || false;
    if (localStorageNominations.length > 0)
      this.setState({
        nominations: localStorageNominations,
        disableNominations,
      });
  };

  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);
    let movieIdList = [];
    if (urlParams.get("shareable"))
      movieIdList = decodeURIComponent(urlParams.get("shareable")).split(",");

    if (movieIdList.length > 0) {
      this.getMoviesByIds(movieIdList);
    } else {
      this.getMoviesFromLocalStorage();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { nominations, disableNominations } = this.state;
    if (!isEqual(prevState.nominations, this.state.nominations)) {
      localStorage.setItem("nominations", JSON.stringify(nominations));
      localStorage.setItem("disableNominations", disableNominations);
    }
  }

  handleSearchChange = (value) => {
    this.setState({ searchTerm: value });
  };

  handleMovieListLoaded = (data) => {
    this.setState({ movies: data.Search });
  };

  checkExists = (nominations, item) =>
    nominations.some((nomination) => nomination.imdbID === item.imdbID);

  handleNomination = (data) => {
    let { nominations, isCancelNominationBanner } = this.state;
    let disableNominations = false;

    if (this.checkExists(nominations, data) ) {
      return;
    }
    if (nominations.length === 4) {
      disableNominations = true;
      isCancelNominationBanner = false;
    } else if (nominations.length > 4) {
      return;
    }

    const newNominations = [...nominations, data];

    this.setState({
      nominations: newNominations,
      disableNominations,
      isCancelNominationBanner,
    });
  };

  handleNominationRemoval = (data) => {
    const { nominations, disableNominations } = this.state;
    const updatedNominations = nominations.filter(
      (nomination) => nomination.imdbID !== data.imdbID
    );
    if (disableNominations)
      this.setState({
        nominations: updatedNominations,
        disableNominations: !disableNominations,
      });
    else this.setState({ nominations: updatedNominations });
  };

  handleShareNominationClick = async () => {

    const idList = this.state.nominations
      .map((nomination) => nomination.imdbID)
      .join(",");
    const shareableLink = 
      `${window.location.href.split("?")[0]}?shareable=${encodeURIComponent(idList)}`;
    this.setState({ shareableLink, isShareModalVisible: true });
  };


  render() {
    const {
      searchTerm,
      movies,
      nominations,
      disableNominations,
      shareableLink,
      isCancelNominationBanner,
      isShareModalVisible
    } = this.state;

    const movieList = movies.map((movie) => {
      if (this.checkExists(nominations, movie)) {
        movie.isDisabled = true;
      } else {
        movie.isDisabled = false;
      }
      return movie;
    });
    

    return (
      <AppProvider i18n={enTranslations}>
        <Frame>
          <Page title="The Shoppies">
            {nominations.length > 4 && !isCancelNominationBanner && (
              <div style={{ marginBottom: 15 }}>
                <Banner
                  title="Nominations Complete!"
                  status="success"
                  onDismiss={() =>
                    this.setState({ isCancelNominationBanner: true })
                  }
                >
                  You've made 5 nominations. Thank you for participating!
                </Banner>
              </div>
            )}

            <SearchMovie
              onSearchChange={this.handleSearchChange}
              onMovieListLoaded={this.handleMovieListLoaded}
            />
            <div style={{ marginTop: 30 }}>
              <Layout>
                <Layout.Section oneHalf>
                  <MovieResults
                    searchResult={searchTerm}
                    data={movieList}
                    onNominate={this.handleNomination}
                    isDisabled={disableNominations}
                  />
                </Layout.Section>

                <Layout.Section oneHalf>
                  <Nominations
                    data={nominations}
                    onRemove={this.handleNominationRemoval}
                    onShareNominationClick = {this.handleShareNominationClick}
                  />
                </Layout.Section>
              </Layout>
            </div>

            <ShareLinkModal
              isShareModalVisible = {isShareModalVisible}
              shareableLink={shareableLink}
              shareableLinkTitle="Your movie nominations "
              onClose = {() => this.setState({ isShareModalVisible: false })}
            />
          </Page>
        </Frame>
      </AppProvider>
    );
  }
}

export default App;
