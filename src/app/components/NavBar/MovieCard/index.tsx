import { useState, useEffect } from "react";
import { Movie } from "@/app/types/movie";
import StarRating from "../StarRating";
import "./index.scss";
import { useRouter } from "next/navigation";

export interface Props {
  movie: Movie;
  fetchTrailer: (movieId: number) => Promise<string | null>;
}

export default function MovieCard(props: Props) {
  const router = useRouter();
  const { movie, fetchTrailer } = props;
  const [trailerLink, setTrailerLink] = useState<string | null>(null);

  useEffect(() => {
    const loadTrailer = async () => {
      const trailer = await fetchTrailer(movie.id);
      setTrailerLink(trailer);
    };

    loadTrailer();
  }, [movie.id, fetchTrailer]);

  const handleClick = (id: number) => {
    router.push(`Movie/${id}`);
  };

  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
        <div className="hidden-content">
          {movie.overview && (
            <p className="description">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          )}
          <button className="btn-default" onClick={() => handleClick(movie.id)}>
            Ver mais
          </button>
          {trailerLink && (
            <a
              href={trailerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-button"
            >
              Assistir Trailer
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
