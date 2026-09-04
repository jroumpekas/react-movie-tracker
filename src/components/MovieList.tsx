import React from 'react'
import { Link } from 'react-router-dom'
import type {Movie} from '../App'

interface MovieListProps {
    movies: Movie[]
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

const MovieList: React.FC<MovieListProps> = ({ movies, onDelete, onToggle }) => {
    if (movies.length === 0) {
        return (
            <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '16px' }}>
                No movies available on your list.
            </p>
        )
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {movies.map((movie) => (
                <li
                    key={movie.id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* Checkbox & Τίτλος */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                            type="checkbox"
                            checked={movie.watched}
                            onChange={() => onToggle(movie.id)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6' }}
                        />

                        <Link
                            to={`/movie/${movie.id}`}
                            style={{
                                color: movie.watched ? '#94a3b8' : '#ffffff',
                                textDecoration: movie.watched ? 'line-through' : 'none',
                                fontWeight: '500',
                                fontSize: '1rem',
                            }}
                        >
                            {movie.title}
                        </Link>
                    </div>

                    {/* Κουμπί Διαγραφής */}
                    <button
                        onClick={() => onDelete(movie.id)}
                        style={{
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            transition: 'background 0.2s',
                        }}
                    >
                        Διαγραφή
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default MovieList