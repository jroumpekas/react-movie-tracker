import { Link } from 'react-router-dom'
import type { Movie}  from '../App'

interface MovieListProps {
    movies: Movie[]
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

function MovieList({ movies, onDelete, onToggle }: MovieListProps) {
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                        {movie.title}
                    </Link>

                    <input
                        type="checkbox"
                        checked={movie.watched}
                        onChange={() => onToggle(movie.id)}
                    />

                    <button onClick={() => onDelete(movie.id)}>
                        Διαγραφή
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default MovieList