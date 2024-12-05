"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "./index.scss";
import Footer from "../../components/Footer";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "ade2571648f408ce4031a4eda8eb52d6",
              language: "pt-BR",
            },
          }
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: "ade2571648f408ce4031a4eda8eb52d6",
              language: "pt-BR",
            },
          }
        );
        setCast(castResponse.data.cast.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar os detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="loading">Carregando...</p>;
  if (!movie) return <p className="error">Filme não encontrado.</p>;

  return (
    <div className="movie-details-container">
      <div
        className="background"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>
      <div className="details">
        <h1 className="title">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <p className="overview">{movie.overview}</p>
        <div className="genres">
          <strong>Gêneros:</strong>
          <div className="genres-list">
            {movie.genres.map((genre) => (
              <span className="genre" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="info">
          <p className="info-item">
            <strong>Duração:</strong> {movie.runtime} minutos
          </p>
          <p className="info-item">
            <strong>Data de lançamento:</strong> {movie.release_date}
          </p>
          <p className="info-item">
            <strong>Avaliação:</strong> {movie.vote_average}
          </p>
        </div>
        <div className="cast">
          <strong>Elenco principal:</strong>
          <ul className="cast-list">
            {cast.map((actor) => (
              <li key={actor.id}>
                <span className="actor-name">{actor.name}</span> como{" "}
                <span className="character-name">{actor.character}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MovieDetailsPage;
