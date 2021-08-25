import React, { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "./common/Filter";
import CardsList from "./components/Cards/CardsList";
import Header from "./common/Header";
import { removeDuplicates } from "./helpers/util";

interface IKeys {
  value: number;
  label: string;
}

function App() {
  const [genres, setGenres] = useState([]);
  const [origVideos, setOrigVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [releaseYear, setReleaseYear] = useState<any>([]);
  const [filter, setFilter] = useState({ action: "" });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Object>();
  const [cardsCount, setCardsCount] = useState<number>(12);

  //Handle async api call
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        setIsLoading(true);
        const json = await response.json();
        setIsLoading(false);

        //set genres from dataset for genre filter
        setGenres(
          json.genres.map(
            ({ id, name }) =>
              ({
                value: id,
                label: name
              } as IKeys)
          )
        );

        //set release year from dataset for year filter
        setReleaseYear(
          //remove year duplicates
          removeDuplicates(
            json.videos.map(
              ({ release_year }) =>
                ({
                  value: release_year,
                  label: release_year
                } as IKeys)
            ),
            "value"
          )
        );
        setVideos(json.videos);
        setOrigVideos(json.videos);
      } catch (error) {
        console.log("error", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  //Set Filters in state
  const handleChange = (option, { action, name }) => {
    setFilter({ ...filter, action: action, [name]: option });
  };

  const loadMoreCards = () => {
    setCardsCount(cardsCount + 12);
  };

  //Handle different scenarios of filters being set
  useEffect(() => {
    //When Genre is set but year is not set
    if (filter["genre"] && !filter["RY"]) {
      //When genre is not set
      !filter["genre"].length
        ? setVideos(origVideos)
        : setVideos(
            origVideos.filter(({ genre_id }: any) =>
              filter["genre"].map((x: any) => x.value).includes(genre_id)
            )
          );
    }
    //When Genre is not set but year is set
    else if (filter["RY"] && !filter["genre"]) {
      !filter["RY"]
        ? setVideos(origVideos)
        : setVideos(
            origVideos.filter((x: any) => filter["RY"].value === x.release_year)
          );
    }
    //When Genre is not set but year is set.
    // When user tries to change the year
    else if (
      Object.keys(filter).includes("RY") &&
      !filter["genre"] &&
      filter.action === "clear"
    ) {
      setVideos(origVideos);
    }
    // When Genre is set and year is not set
    else if (filter["genre"] && !filter["RY"]) {
      setVideos(
        videos.filter((x: any) => filter["RY"].value === x.release_year)
      );
    }
    // When genre and year are both set
    else if (filter["genre"] && filter["RY"]) {
      //when genre filter is cleared/not set
      !filter["genre"].length
        ? setVideos(
            origVideos.filter((x: any) => filter["RY"].value === x.release_year)
          )
        : setVideos(
            origVideos.filter(
              (x: any) =>
                filter["RY"].value === x.release_year &&
                filter["genre"].map((x: any) => x.value).includes(x.genre_id)
            )
          );
    }
  }, [filter]);

  return (
    <div>
      <Header />
      <Container>
        {/* Show Errors! */}
        {error ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "9rem"
            }}
          >
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
            <CardsList
              isLoading={isLoading}
              videos={videos}
              cardsCount={cardsCount}
            />
            {videos.length > cardsCount && (
              <div style={{ textAlign: "center" }}>
                <Button color="link" onClick={loadMoreCards}>
                  Load More...
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
