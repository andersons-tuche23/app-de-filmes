import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard";
import { Movie } from "@/app/types/movie";
import "./index.scss";

interface Video {
  key: string;
  type: string;
  site: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMovies(currentPage);
  }, []);

  const fetchTrailer = async (movieId: number): Promise<string | null> => {
    const response = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      params: {
        api_key: "ade2571648f408ce4031a4eda8eb52d6",
        language: "pt-BR",
      },
    });

    const videos: Video[] = response.data.results;

    const trailers = videos.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailers.length > 0
      ? `https://www.youtube.com/watch?v=${trailers[0].key}`
      : null;
  };

  const getMovies = (page: number) => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "ade2571648f408ce4031a4eda8eb52d6",
        language: "pt-BR",
        page,
      },
    }).then((response) => {
      setMovies((prevMovies) => {
        const newMovies = response.data.results;
        const allMovies = [...prevMovies, ...newMovies];
        const uniqueMovies = allMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );
        return uniqueMovies;
      });
    });
  };

  return (
    <div>
      <ul className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            fetchTrailer={fetchTrailer}
          />
        ))}
      </ul>
      <div className="button-container">
    <button
      onClick={() => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getMovies(nextPage);
      }}
      className="load-more-button"
    >
      Carregar mais filmes
    </button>
  </div>
    </div>
  );
}
