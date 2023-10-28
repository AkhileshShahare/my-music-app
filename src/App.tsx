import React, { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "./common/Filter";
import CardsList from "./components/Cards/CardsList";
import Header from "./common/Header";
import Footer from "./common/Footer";

function App() {
  const [data, setData] = useState({
    genres: [],
    origVideos: [],
    videos: [],
    releaseYear: [],
    filter: { action: "" },
    isLoading: false,
    error: null,
    cardsCount: 12,
  });

  const { genres, origVideos, videos, releaseYear, filter, isLoading, error, cardsCount } = data;

  // Handle async API call and initial data setup
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

      try {
        const response = await fetch(url);
        setData((prevData) => ({ ...prevData, isLoading: true }));
        const json = await response.json();
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          genres: json.genres.map(({ id, name }) => ({ value: id, label: name })),
          origVideos: json.videos,
          videos: json.videos,
          releaseYear: [...new Set(json.videos.map(({ release_year }) => ({ value: release_year, label: release_year })))],
        }));
      } catch (error) {
        console.log("error", error);
        setData((prevData) => ({ ...prevData, error }));
      }
    };

    fetchData();
  }, []);

  // Handle filter changes
  const handleChange = (option, { action, name }) => {
    setData((prevData) => ({
      ...prevData,
      filter: { ...prevData.filter, action, [name]: option },
    }));
  };

  const loadMoreCards = () => {
    setData((prevData) => ({
      ...prevData,
      cardsCount: prevData.cardsCount + 12,
    }));
  };

  // Apply filters to the videos
  useEffect(() => {
    let filteredVideos = origVideos;

    if (filter.genre && filter.genre.length) {
      filteredVideos = filteredVideos.filter(({ genre_id }) =>
        filter.genre.map((x) => x.value).includes(genre_id)
      );
    }

    if (filter.RY) {
      filteredVideos = filteredVideos.filter((x) => filter.RY.value === x.release_year);
    }

    setData((prevData) => ({
      ...prevData,
      videos: filteredVideos,
    }));
  }, [filter, origVideos]);

  return (
    <div>
      <Header />
      <Container style={{ minHeight: "80vh" }}>
        {error ? (
          <div style={{ textAlign: "center", paddingTop: "9rem" }}>
            Error!
            <Button color="link" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        ) : (
          <>
            <Filters
              filter={filter}
              genres={genres}
              handleChange={handleChange}
              releaseYear={releaseYear}
            />
            <CardsList isLoading={isLoading} videos={videos} cardsCount={cardsCount} />
            {videos.length > cardsCount && (
              <div style={{ textAlign: "center" }}>
                <div
                  color="link"
                  onClick={loadMoreCards}
                  style={{
                    cursor: "pointer",
                    fontWeight: 400,
                    color: "#0d6efd",
                    textDecoration: "underline",
                  }}
                >
                  Load More...
                </div>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
