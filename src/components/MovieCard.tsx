import MovieCardProps from "../interfaces/MovieCardProps";

function MovieCard({ name, poster, type, year }: MovieCardProps) {

    const img_url = (poster !== "N/A" || !poster) ? poster : "https://via.placeholder.com/400";

    return (
        <>
            <div className="container">
                <div className="img-box">
                    <img src={img_url} alt="" />
                </div>
                <div className="content">
                    <span className="type-span">{type}</span>
                    <h3>{name}</h3>
                    <span className="year-span">{year}</span>
                    <div className="btn-div">
                        <button type="button" className="btn btn-outline-success">Watch</button>
                        <button type="button" className="btn btn-warning">Download</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard