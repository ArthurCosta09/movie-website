import NotFoundProp from "../interfaces/NotFoundProp";
import "../style/NotFound.css";

const NotFound = ({ movie }: NotFoundProp) => {
    return (
        <>
            <div className="not-found-box">
                <h1><span>{movie.toUpperCase()}</span> NOT FOUND!</h1>
                <br />
                <h2>😥</h2>
            </div>
        </>
    )
}

export default NotFound;