import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import MovieCard from "../MovieCard";
import { Movie } from "@/app/types/movie";



export default function MovieLIst() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "ade2571648f408ce4031a4eda8eb52d6",
        language: "pt-BR",
      },
    }).then((response) => {
      console.log(response, 'response');
      
      setMovies(response.data.results);
    });
  };
  
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
       <MovieCard
       key={movie.id}
      movie={movie}
       />
      ))}
    </ul>
  );
}

//ade2571648f408ce4031a4eda8eb52d6
