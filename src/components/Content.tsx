import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style/MovieCard.css";
import MovieCard from "./MovieCard";
import NotFound from "./NotFound";
import EmptyCard from "./EmptyCard";
import DataResponse from "../interfaces/DataResponse";
import { ReactNode } from "react";
import { PulseLoader } from "react-spinners";

// Link da API. Necessário acessar a internet para acessar o conteúdo 🙂
const MOVIE_URL: string = `https://www.omdbapi.com/?&apikey=41916048`;

// Variaveis tela de loading
const loadingSize: number = 30;
const loadingColor: string = "#E8E8E8";

// Container conteúdo do site
const Content = () => {
    const [currMovie, setCurrMovie] = useState("Superman"); // Filme atual na aba de pesquisa
    const [searchMovie, setSearchMovie] = useState(""); // Filme que será pesquisado na aba de pesquisa
    const [movies, setMovies] = useState([]); // Lista com os filmes encontrados de acordo com o currMovie
    const [loading, setLoading] = useState(true); // Variável de tela de loading ao buscar os filmes

    // Evento click no botão "Search"
    const onClick = () => {
        if (searchMovie !== "" && searchMovie.toLocaleLowerCase() !== currMovie.toLocaleLowerCase()) {
            setLoading(true);
            setCurrMovie(searchMovie);
            searchMovies(searchMovie);
        }

    }

    // Evento ao digitar texto no "Input"
    const onChange = (event: any) => {
        setSearchMovie(event?.target.value);
    }

    //Adiciona cartas vazias caso o número de elementos da ultima linha seja menor que as anteriores.
    const cardHandle = (movies: DataResponse[]) => {
        const reminder = movies.length % 6;
        const cardTags = movies.map((movie: DataResponse) => <MovieCard key={movie.imdbID} name={movie.Title}
            poster={movie.Poster} type={movie.Type} year={movie.Year}></MovieCard>);

        //Cada linha contém 6 cards. Caso a ultima linha contenha menos que 6 cards, serão adicionados cards vazios para compor os que faltam.
        if (reminder !== 0) {
            const emptyCardsNumber: number = 6 - reminder;
            let emptyCards = [];

            for (let i = 0; i < emptyCardsNumber; i++) {
                emptyCards.push(<EmptyCard key={i}></EmptyCard>);
            }

            const output = [...cardTags, ...emptyCards];
            return output.map((movie: ReactNode) => movie);
        }

        return cardTags.map((movie: ReactNode) => movie);
    }

    // Evento caso o usuário pressione Enter no "Input"
    const onClickDownHandle = (event: any) => {

        if (event?.key === "Enter") {
            event?.preventDefault(); // Evitar que tenha um reload na pagina
            if (searchMovie && searchMovie.toLowerCase() !== currMovie.toLowerCase()) {
                setLoading(true);
                setCurrMovie(searchMovie);
                searchMovies(searchMovie);
            }
        }
    }

    // Função assíncrona para conectar com a API dos filmes
    const searchMovies = async (title: string, type: string = "movie") => {
        let moviesFinded: any = [];

        // Obter os filmes em até 5 páginas
        for (let i = 1; i <= 5; i++) {
            try {
                const response = await fetch(`${MOVIE_URL}&s=${title}&page=${i}&type=${type}`);
                const data = await response.json();

                const dataMovies: DataResponse[] = data.Search;
                moviesFinded = [...moviesFinded, ...dataMovies];

            } catch {
                break;
            }
        }

        setMovies(moviesFinded);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        searchMovies(currMovie);
    }, [])

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">MoviesParadise🎥</a>

                    <form className="d-flex">
                        <input className="form-control me-2" type="search"
                            placeholder="Search movie" aria-label="Search" onChange={onChange}
                            onKeyDown={onClickDownHandle} />
                        <button type="button" className="btn btn-outline-success" onClick={onClick}>Search</button>
                    </form>

                </div>
            </nav>

            {loading ? <div className="loading-box">
                <PulseLoader color={loadingColor} loading={loading} size={loadingSize}></PulseLoader>
            </div> :
                <div className="movie-group">
                    {movies?.length > 0 && <h1><span>{currMovie.toUpperCase()}</span> MOVIES 🎞️</h1>}

                    {movies?.length > 0 ? <div className="movie-card-group">
                        {cardHandle(movies)}
                    </div> : <div className="movie-card-group"><NotFound movie={currMovie}></NotFound></div>}

                </div>

            }

        </>
    )
}

export default Content;